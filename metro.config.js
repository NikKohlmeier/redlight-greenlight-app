// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Fix MIME type issues for web by ensuring assets are properly resolved
config.resolver = {
  ...config.resolver,
  assetExts: [
    ...config.resolver.assetExts,
    // Ensure all image types are included
    'png', 'jpg', 'jpeg', 'gif', 'webp', 'svg', 'ico',
  ],
  sourceExts: [
    ...config.resolver.sourceExts,
    'js', 'jsx', 'ts', 'tsx', 'json', 'mjs',
  ],
};

// Configure transformer to handle null assets gracefully
config.transformer = {
  ...config.transformer,
  getTransformOptions: async () => ({
    transform: {
      experimentalImportSupport: false,
      inlineRequires: true,
    },
  }),
};

module.exports = config;

