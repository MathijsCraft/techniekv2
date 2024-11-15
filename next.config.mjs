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
};

export default nextConfig;
