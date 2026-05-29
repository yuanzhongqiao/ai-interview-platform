/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  async rewrites() {
    return [
      { source: "/favicon.ico", destination: "/brand-icons/lingwu-icon-ear-analytics.png" },
    ];
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,POST,PUT,PATCH,DELETE,OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "Content-Type, Authorization, X-Requested-With" },
        ],
      },
    ];
  },
  experimental: {
    serverComponentsExternalPackages: [
      "@supabase/supabase-js",
      "@supabase/auth-js",
      "@supabase/ssr",
      "pdf-parse",
      "ws",
      "bufferutil",
      "utf-8-validate",
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
