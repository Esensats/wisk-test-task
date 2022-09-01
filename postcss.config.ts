export default {
  plugins: [
    // require('postcss-font-magician')({
    //   variants: {
    //     'Open Sans': {
    //       '300': ['woff2'],
    //       '400': ['woff, eot, woff2'],
    //       '400 italic': ['woff2'],
    //       '500': ['woff2'],
    //     },
    //   },
    // }),
    require('postcss-preset-env')(),
    require('autoprefixer')({
      grid: 'autoplace',
    }),
    require('cssnano')(),
  ],
}
