/** @type {import('next').NextConfig} */
const nextConfig = {
    env:{
        MAPY_API_KEY: process.env.MAPY_API_KEY,
    }
};

export default nextConfig;