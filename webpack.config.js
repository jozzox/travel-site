const { watch } = require("node:fs");
const path = require('node:path');

const postCSSPlugins = [
  require('postcss-import'),
  require('postcss-simple-vars'),
  require('postcss-nested'),
  require('autoprefixer'),
]

module.exports = {
	entry: "./app/assets/scripts/App.js",
	output: {
		filename: "bundled.js",
		path: path.resolve(__dirname, "app"),
	},
	devServer: {
		watchFiles: ["app/**/*.html", "app/assets/styles/**/*.css", "app/assets/scripts/**/*.js"],
		static: {
			directory: path.join(__dirname, "app"),
			watch: false,
		},
		hot: true,
		port: 3000,
	},
	mode: "development",
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: [
					"style-loader",
					{ loader: "css-loader", options: { url: false } },
					{
						loader: "postcss-loader",
						options: { postcssOptions: { plugins: postCSSPlugins } },
					},
				],
			},
			{
				test: /\.(png|jpe?g|gif|svg)$/i,
				type: "asset/resource",
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: "asset/resource",
			},
		],
	},
};
