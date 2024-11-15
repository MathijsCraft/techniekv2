/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: [
      'prisma',
      '@prisma/client',
      'bcrypt',
      'next-auth/next',
    ],
  },
  output: "standalone", // Add this line to enable standalone mode for Docker
};

export default nextConfig;
