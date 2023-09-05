const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    open: true,//启动项目后自动开启浏览器
    historyApiFallback: true,
    allowedHosts: "all",
    // host: 'localhost',//对应的主机名
    port: 8080,//端口号
    https: false,//是否开启协议名,如果开启会发出警告
  }
})
