// 该文件在编译的时候会与项目其他配置文件合并，在这里用来给路径起别名。
// 在DOM中使用别名的时候需要在加~，如<img src="~assets/img/xxx.png" alt="">

module.exports = {
  configureWebpack: {
    // 配置路径相关使用resolve
    resolve: {
      // extensions: [], 配置后某些文件的后缀名就可以不写了，脚手架已经默认配置了.js.vue等
      // alias可以给路径起别名
      alias: {
        // @表示src，因为脚手架里面默认已经配置过这个src了
        assets: "@/assets",
        common: "@/common",
        components: "@/components",
        network: "@/network",
        views: "@/views"

        // 'router': "@/router",
        // 'store': "@/store"
        // 不需要写这2个，因为router和store只在main.js中引入，其他地方可以通过this.$router和this.$store获取相应实例
      }
    },
    //警告 webpack 的性能提示
    performance: {
      hints: "warning",
      //入口起点的最大体积
      maxEntrypointSize: 50000000,
      //生成文件的最大体积
      maxAssetSize: 30000000,
      //只给出 js 文件的性能提示
      assetFilter: function(assetFilename) {
        return assetFilename.endsWith(".js");
      }
    }
  }
};
