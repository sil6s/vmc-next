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
        src: "/favicon.png",
        sizes: "any",
        type: "image/png"
      }
    ]
  };
}
