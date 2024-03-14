
const { withSentryConfig } = require('@sentry/nextjs');

const moduleExports = {
  reactStrictMode: true,
  sentry: {
    hideSourceMaps: true,
  },
};

const sentryWebpackPluginOptions = {
  silent: true, 
};

module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions);
