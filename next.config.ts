import type { NextConfig } from 'next'
import withNextIntl from 'next-intl/plugin'

module.exports = {
  output: 'standalone', // Yoki comment qilib qo‘ying
}

const nextConfig: NextConfig = withNextIntl()({
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io',
        port: '',
      },
    ],
  },
  
})

export default nextConfig
