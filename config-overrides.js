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
    ['forms']: path.resolve(__dirname, 'src/components/forms'),
    ['layouts']: path.resolve(__dirname, 'src/components/layouts'),
    ['hooks']: path.resolve(__dirname, 'src/hooks'),
    ['pages']: path.resolve(__dirname, 'src/pages'),
    ['parser']: path.resolve(__dirname, 'src/parser'),
    ['services']: path.resolve(__dirname, 'src/services')
  })
);