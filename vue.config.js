module.exports = {
  publicPath: '/',
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: []
    }
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData:`
          @import "/src/styles/variables.scss";
          @import "@/styles/mixin.scss";
        `,
      },
    },
  },
}
