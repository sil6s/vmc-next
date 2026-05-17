import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

export type PrivateStoredObject = {
  key: string;
  filename: string;
  contentType: string;
  size: number;
  bucket: string;
};

type UploadInput = {
  key: string;
  filename: string;
  contentType: string;
  body: Buffer;
};

function requiredR2Env() {
  const endpoint = process.env.R2_ENDPOINT;
  const bucket = process.env.R2_BUCKET_NAME;
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;

  if (!endpoint || !bucket || !accessKeyId || !secretAccessKey) {
    return null;
  }

  return { endpoint, bucket, accessKeyId, secretAccessKey };
}

export function hasPrivateUploadStorage() {
  return Boolean(requiredR2Env());
}

function r2Client() {
  const env = requiredR2Env();
  if (!env) return null;

  return {
    bucket: env.bucket,
    client: new S3Client({
      credentials: {
        accessKeyId: env.accessKeyId,
        secretAccessKey: env.secretAccessKey
      },
      endpoint: env.endpoint,
      region: "auto"
    })
  };
}

export function safeObjectSegment(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 96) || "file";
}

export async function uploadPrivateObjects(inputs: UploadInput[]): Promise<PrivateStoredObject[]> {
  const storage = r2Client();
  if (!storage) return [];

  const uploaded: PrivateStoredObject[] = [];
  for (const input of inputs) {
    await storage.client.send(
      new PutObjectCommand({
        Bucket: storage.bucket,
        Key: input.key,
        Body: input.body,
        ContentType: input.contentType,
        Metadata: {
          filename: input.filename
        }
      })
    );

    uploaded.push({
      key: input.key,
      filename: input.filename,
      contentType: input.contentType,
      size: input.body.byteLength,
      bucket: storage.bucket
    });
  }

  return uploaded;
}
