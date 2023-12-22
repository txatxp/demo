const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    historyApiFallback: true,
    allowedHosts: "all",
    host: "0.0.0.0", //对应的主机名
    client: {
      overlay: false,
    },
  },
});
