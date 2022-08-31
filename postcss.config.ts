export default {
  plugins: [
    require('autoprefixer')({
      grid: 'autoplace',
    }),
    require('postcss-preset-env')(),
    require('cssnano')(),
  ],
}
