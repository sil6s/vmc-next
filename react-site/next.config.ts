import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
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
      }
    ];
  }
};

export default nextConfig;
