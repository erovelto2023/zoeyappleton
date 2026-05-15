/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'www.warlockpublishing.com',
            },
            {
                protocol: 'https',
                hostname: 'warlockpublishing.com',
            }
        ]
    },
};

export default nextConfig;
