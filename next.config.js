/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/auth/:path*',
        destination: 'http://localhost:4321/api/auth/:path*'
      }, 
      {
        source: '/api/keys/:path*',
        destination: 'http://localhost:4321/api/keys/:path*'
      },
    ];
  }
}

module.exports = nextConfig
