const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  pwa: {
    workboxPluginMode: 'GenerateSW', // 'InjectManifest'
    name: 'Kabbage Boards',
    themeColor: '#1cc61c',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    assetsVersion: '',
    manifestPath: 'manifest.json',
    manifestOptions: {
      name: 'Kabbage Boards',
      short_name: 'Kab Boards',
      start_url: '.',
      display: 'standalone',
      themeColor: '#1cc61c',
    }
  },

  pluginOptions: {
    vuetify: {
			// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
		}
  }
})
