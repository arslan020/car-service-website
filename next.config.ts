import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/book",
        destination: "/online-booking",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
