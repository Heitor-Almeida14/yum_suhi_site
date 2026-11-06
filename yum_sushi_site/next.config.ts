import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configuração padrão compatível com deploy Next.js na Vercel.
  typescript: { ignoreBuildErrors: true },
  reactStrictMode: false,
};

export default nextConfig;
