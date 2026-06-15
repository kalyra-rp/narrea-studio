import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      // Storage Supabase (bucket public blog-images) — utilisé plus tard
      { protocol: "https", hostname: "hltvaqwcrbemxfvtamwb.supabase.co" },
    ],
  },
};

export default nextConfig;
