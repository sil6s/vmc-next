import { createClient } from "next-sanity";
import { sanityConfig } from "./env";

export const client = createClient({
  projectId: sanityConfig.projectId,
  dataset: sanityConfig.dataset,
  apiVersion: sanityConfig.apiVersion,
  useCdn: false,
  token: sanityConfig.token,
  perspective: "published"
});
