/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'pub-ef35b960bf9f45cc8ce66e68ce5fabf9.r2.dev',
        protocol: 'https',
        port: '',
      },
    ],
  },
}

export default nextConfig
