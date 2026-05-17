"use client";

import { NextStudio } from "next-sanity/studio";
import config from "@/sanity/studio.config";

export function SanityStudioClient() {
  return <NextStudio config={config} />;
}
