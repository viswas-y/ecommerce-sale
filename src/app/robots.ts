import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://novaradesign.com";
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/account/orders", "/account/addresses", "/checkout", "/order-success"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
