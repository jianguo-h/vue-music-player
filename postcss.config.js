module.exports = {
	plugins: [
		require("autoprefixer")({
			browserslist: [
				"> 5%", 
				"not ie <= 8",
				"last 2 versions"
			]
		})
	]
}