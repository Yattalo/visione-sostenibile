import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: ".",
  },
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/admin/dashboard",
        destination: "/admin",
        permanent: true,
      },
      {
        source: "/admin/crm/contacts",
        destination: "/admin/crm",
        permanent: true,
      },
      {
        source: "/client-login",
        destination: "/admin/login",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
