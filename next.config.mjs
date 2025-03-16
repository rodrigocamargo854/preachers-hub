/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "example.com", // Substitua pelo domínio correto das imagens externas
        },
        {
          protocol: "https",
          hostname: "i.pinimg.com",
        },
        {
          protocol: "https",
          hostname: "upload.wikimedia.org",
        },
      ],
    },
  };
  
  export default nextConfig;
  