const {
  addLessLoader,
  addWebpackAlias,
  fixBabelImports,
  override
} = require('customize-cra');

const path = require('path');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { '@primary-color': '#1DA57A' }
  }),
  addWebpackAlias({
    ['components']: path.resolve(__dirname, 'src/components'),
    ['hooks']: path.resolve(__dirname, 'src/hooks'),
    ['pages']: path.resolve(__dirname, 'src/pages'),
    ['services']: path.resolve(__dirname, 'src/services')
  })
);