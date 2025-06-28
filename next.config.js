/** @type {import('next').NextConfig} */

const nextConfig = {
  basePath: '',
  staticPageGenerationTimeout: 2000,
  experimental: {
    outputStandalone: true,
  },
  pageExtensions: ["js", "jsx", "ts", "tsx"],

  webpack(config, options) {
    config.resolve.modules.push(__dirname);
    config.resolve.modules.push("./src");
    return config;
  },
};

module.exports = nextConfig;