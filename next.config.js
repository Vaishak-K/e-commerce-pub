/** @type {import('next').NextConfig} */
const webpack = require("webpack");
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fakestoreapi.com",
        port: "",
        pathname: "/img/**",
      },
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
        port: "",
        pathname: "/**", // Adjust the pathname as needed
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**", // Adjust the pathname as needed
      },
      {
        protocol: "https",
        hostname: "fatcatcollectibles.in",
        port: "",
        pathname: "/**", // Adjust the pathname as needed
      },
    ],
  },
  webpack(config, { isServer }) {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        crypto: require.resolve("crypto-browserify"),

        buffer: require.resolve("buffer"),
        util: require.resolve("util"),
        assert: require.resolve("assert"),
      };
    }
    return config;
  },
};

module.exports = nextConfig;
