import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    host: "https://anuragnigam.in",
    sitemap: "https://anuragnigam.in/sitemap.xml",
  };
}
