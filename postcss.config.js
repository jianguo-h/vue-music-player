module.exports = {
  plugins: [
    require("autoprefixer")({
      browsers: [
        "> 5%",
        "not ie <= 8",
        "last 5 versions"
      ]
    })
  ]
}