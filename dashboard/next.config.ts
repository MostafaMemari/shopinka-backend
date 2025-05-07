import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    domains: ['node-bucket.storage.c2.liara.space']
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb'
    }
  },
  basePath: process.env.BASEPATH,
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
        locale: false
      }
    ]
  }
}

export default nextConfig
