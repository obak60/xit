/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "admin.shiulifashion.com",
            },
            {
                protocol: "https",
                hostname: "iili.io",
            },
            {
                protocol: "https",
                hostname: "i.ibb.co.com",
            },
            {
                protocol: "https",
                hostname: "i.ibb.co",
            },
            {
                protocol: "https",
                hostname: "iili.io",
            },
        ],
    },
};

export default nextConfig;
