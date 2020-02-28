const {
  addLessLoader,
  addWebpackAlias,
  fixBabelImports,
  disableEsLint,
  override
} = require('customize-cra');

const path = require('path');
const { geekblue, green } = require('@ant-design/colors');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true
  }),
  addLessLoader({
    javascriptEnabled: true,
    // https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less
    modifyVars: {
      '@primary-color': geekblue[5],
      '@btn-primary-bg': green[5],
      '@layout-header-height': '40px',
      '@layout-header-background': geekblue[5],
      '@layout-sider-background-light': '@layout-body-background'
    }
  }),
  addWebpackAlias({
    ['components']: path.resolve(__dirname, 'src/components'),
    ['fire']: path.resolve(__dirname, 'src/fire'),
    ['forms']: path.resolve(__dirname, 'src/components/forms'),
    ['hooks']: path.resolve(__dirname, 'src/hooks'),
    ['layouts']: path.resolve(__dirname, 'src/components/layouts'),
    ['pages']: path.resolve(__dirname, 'src/pages'),
    ['parser']: path.resolve(__dirname, 'src/parser'),
    ['routes']: path.resolve(__dirname, 'src/routes'),
    ['services']: path.resolve(__dirname, 'src/services')
  }),
  // MUTE THE WARNINGS.
  disableEsLint()
);