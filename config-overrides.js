const {
  addLessLoader,
  addWebpackAlias,
  fixBabelImports,
  override
} = require('customize-cra');

const path = require('path');
const { geekblue } = require('@ant-design/colors');

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
      '@layout-header-height': '40px',
      '@layout-header-background': geekblue[5]
    }
  }),
  addWebpackAlias({
    ['components']: path.resolve(__dirname, 'src/components'),
    ['forms']: path.resolve(__dirname, 'src/components/forms'),
    ['firehooks']: path.resolve(__dirname, 'src/firehooks'),
    ['hooks']: path.resolve(__dirname, 'src/hooks'),
    ['layouts']: path.resolve(__dirname, 'src/components/layouts'),
    ['pages']: path.resolve(__dirname, 'src/pages'),
    ['parser']: path.resolve(__dirname, 'src/parser'),
    ['services']: path.resolve(__dirname, 'src/services')
  })
);