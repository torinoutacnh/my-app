const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const InterpolateHtmlPlugin = require("@gozenc/interpolate-html-plugin");
require("dotenv").config({ path: "./.env" });
const port = process.env.PORT || 3000;
module.exports = {
	mode: "development",
	entry: {
		app: "./src/index.tsx",
	},
	output: {
		filename: "[name].[hash].js",
	},
	resolve: {
		alias: {
			"react-dom": "@hot-loader/react-dom",
		},
		extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
		fallback: {
			fs: false,
			util: require.resolve("util/"),
			path: require.resolve("path-browserify"),
			//crypto: require.resolve("crypto-browserify"),
			buffer: require.resolve("buffer/"),
			//https: require.resolve("https-browserify"),
			//http: require.resolve("stream-http"),
			os: require.resolve("os-browserify/browser"),
			//vm: require.resolve("vm-browserify"),
			stream: require.resolve("stream-browserify"),
			//constants: require.resolve("constants-browserify"),
			assert: require.resolve("assert/"),
		},
	},
	devtool: "inline-source-map",
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ["babel-loader"],
			},
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				use: ["ts-loader"],
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
				exclude: /node_modules/,
				use: ["file-loader?name=[name].[ext]"], // ?name=[name].[ext] is only necessary to preserve the original file name
			},
			{
				test: /\.css$/i,
				use: ["style-loader", "css-loader"],
			},
			// {
			// 	test: /\.css$/,
			// 	use: [
			// 		{
			// 			loader: "style-loader",
			// 		},
			// 		{
			// 			loader: "css-loader",
			// 			options: {
			// 				modules: true,
			// 				sourceMap: true,
			// 			},
			// 		},
			// 	],
			// },
		],
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				styles: {
					name: "styles",
					test: /\.css$/,
					chunks: "all",
					enforce: true,
				},
				vendor: {
					chunks: "initial",
					test: "vendor",
					name: "vendor",
					enforce: true,
				},
			},
		},
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.DefinePlugin({
			"process.env": JSON.stringify(process.env),
		}),
		new webpack.ProvidePlugin({
			process: "process/browser",
		}),
		new webpack.ProvidePlugin({
			Buffer: ["buffer", "Buffer"],
		}),
		new HtmlWebpackPlugin({
			template: "./public/index.html",
			favicon: "./public/favicon.ico",
			manifest: "./public/manifest.json",
		}),
		new InterpolateHtmlPlugin(HtmlWebpackPlugin, {
			PUBLIC_URL: "http://localhost:" + port,
			// Replaces %PUBLIC_URL% with https://example.com in index.html.
			VARIABLE: 1024,
			// Replaces %VARIABLE% with 1024 in index.html.
		}),
	],
	devServer: {
		host: "localhost",
		port: port,
		historyApiFallback: true,
		open: true,
		hot: true,
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Headers": "*",
			"Access-Control-Allow-Methods": "*",
		},
	},
};
