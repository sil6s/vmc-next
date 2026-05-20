import { defineConfig } from "sanity";
import { markdownSchema } from "sanity-plugin-markdown";
import { structureTool } from "sanity/structure";
import { sanityConfig } from "./env";
import { schemaTypes } from "./schemaTypes";

export default defineConfig({
  name: "veterinary-medical-center",
  title: "Veterinary Medical Centers",
  projectId: sanityConfig.projectId,
  dataset: sanityConfig.dataset,
  basePath: "/studio",
  plugins: [structureTool(), markdownSchema()],
  schema: {
    types: schemaTypes
  }
});
