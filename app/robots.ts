import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    host: "https://www.anuragnigam.in",
    sitemap: "https://www.anuragnigam.in/sitemap.xml",
  };
}
