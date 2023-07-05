/*
 * @Author: Jackie
 * @Date: 2023-06-25 09:58:10
 * @LastEditTime: 2023-07-05 21:23:22
 * @LastEditors: Jackie
 * @Description: file content
 * @FilePath: /vue3-element-plus-demo/vue.config.js
 * @version: 
 */
const { defineConfig } = require('@vue/cli-service');
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers');
const ComponentsPlugin = require('unplugin-vue-components/webpack');
const AutoImport = require('unplugin-auto-import/webpack');

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      ComponentsPlugin({
        resolvers: [ElementPlusResolver()]
      })
    ]
  }
});
