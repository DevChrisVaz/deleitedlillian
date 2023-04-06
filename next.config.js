/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  images: {
    domains: ["localhost", "backery-ecommerce-services.onrender.com", "deleitedlillian-services.us-3.evennode.com"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "",
        pathname: "/img/**"
      }
    ]
  }
}

module.exports = nextConfig
