import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    formats: ["image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io"
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com"
      }
    ]
  },
  async headers() {
    return [
      {
        // Security + SEO headers for all public pages
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" }
        ]
      },
      {
        // Prevent indexing of admin/auth and online request routes
        source: "/(dashboard|login|not-authorized|studio|online-help)(.*)",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow" }
        ]
      },
      // Long cache for static assets — production only. Turbopack dev chunk
      // filenames aren't content-hashed the way production build output is,
      // so caching them for a year in dev makes edits invisible until the
      // browser cache is manually cleared.
      ...(process.env.NODE_ENV === "production"
        ? [
            {
              source: "/(_next/static|images|favicon.png)(.*)",
              headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }]
            }
          ]
        : [])
    ];
  },
  async redirects() {
    return [
      {
        source: "/service-item/:slug/",
        destination: "/services/:slug/",
        permanent: true
      },
      {
        source: "/locations/fort-thomas/",
        destination: "/locations/vet-in-fort-thomas-ky/",
        permanent: true
      },
      {
        source: "/locations/independence/",
        destination: "/locations/vet-in-independence-ky/",
        permanent: true
      },
      {
        source: "/vet-in-fort-thomas-ky/",
        destination: "/locations/vet-in-fort-thomas-ky/",
        permanent: true
      },
      {
        source: "/vet-in-independence-ky/",
        destination: "/locations/vet-in-independence-ky/",
        permanent: true
      },
      {
        source: "/vet-in-independence-ky-locally-owned-trusted-pet-care/",
        destination: "/locations/vet-in-independence-ky/",
        permanent: true
      },
      {
        source: "/online-vet-pharmacy/",
        destination: "/online-vet-pharmacy-northern-kentucky-cincinnati/",
        permanent: true
      },
      {
        source: "/veterinary-medical-center-contact/",
        destination: "/contact/",
        permanent: true
      },
      {
        source: "/first-vet-visit-northern-kentucky/",
        destination: "/new-patients/",
        permanent: true
      },
      {
        source: "/privacy/",
        destination: "/privacy-policy/",
        permanent: true
      },
      {
        source: "/live-chat/:location/",
        destination: "/online-help/:location/general/",
        permanent: true
      },
      {
        source: "/live-chat/:location/:request/",
        destination: "/online-help/:location/:request/",
        permanent: true
      },
      {
        source: "/online-help/:location/",
        destination: "/online-help/:location/general/",
        permanent: true
      }
    ];
  }
};

export default nextConfig;
