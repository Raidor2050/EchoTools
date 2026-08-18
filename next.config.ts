import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Static export for GitHub Pages at https://raidor2050.github.io/EchoTools */
  output: "export",
  basePath: "/EchoTools",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;