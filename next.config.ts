import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  experimental: {
    serverActions: {
      // Blog cover images are uploaded through a server action
      bodySizeLimit: "6mb",
    },
  },
  async redirects() {
    return [
      {
        source: "/book",
        destination: "/online-booking",
        permanent: true,
      },
      {
        source: "/about",
        destination: "/about-us",
        permanent: true,
      },
      {
        source: "/car-servicing/interim",
        destination: "/car-servicing/oil",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
