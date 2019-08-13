const { override, addDecoratorsLegacy, addWebpackResolve } = require('customize-cra');
const path = require('path');

module.exports = override(
  addDecoratorsLegacy(),
  addWebpackResolve({
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  })
);
