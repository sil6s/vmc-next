import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { sanityConfig } from "./env";
import { schemaTypes } from "./schemaTypes";

export default defineConfig({
  name: "veterinary-medical-center",
  title: "Veterinary Medical Center",
  projectId: sanityConfig.projectId,
  dataset: sanityConfig.dataset,
  basePath: "/dashboard/blog/studio",
  plugins: [structureTool()],
  schema: {
    types: schemaTypes
  }
});
