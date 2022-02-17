/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [{
      source: '/api/:auth*',
      destination: 'http://localhost:4321/api/:auth*'
    }];
  }
}

module.exports = nextConfig
