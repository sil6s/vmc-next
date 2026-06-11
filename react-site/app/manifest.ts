import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Veterinary Medical Centers",
    short_name: "VMC",
    description:
      "Locally owned veterinary care for dogs and cats in Fort Thomas and Independence, KY.",
    start_url: "/",
    display: "browser",
    background_color: "#faf7f2",
    theme_color: "#a91b1b",
    icons: [
      {
        src: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png"
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png"
      }
    ]
  };
}
