import type { NextConfig } from "next";
/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      use: [
        {
          loader: "@svgr/webpack",
          options: { icon: true }, //tailwind에서 w,h 설정 가능하게
        },
      ],
    });

    return config;
  },
};

export default nextConfig;
