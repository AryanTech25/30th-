/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: [
    'http://10.67.230.64:3000', // your LAN IP dev URL
    'http://localhost:3000',
  ],
}

export default nextConfig
