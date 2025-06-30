/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'node-bucket.storage.c2.liara.space',
        pathname: '/galleryItemImages/**',
      },
    ],
  },
};

export default nextConfig;
