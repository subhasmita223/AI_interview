// import { defineConfig } from "drizzle-kit";
/** @type {import('drizzle-kit').Config}   */
export default ({
  schema: "./utils/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://neondb_owner:npg_ncM03QGEBwfq@ep-purple-darkness-a81u6zbw-pooler.eastus2.azure.neon.tech/neondb?sslmode=require&channel_binding=require"
  }
});