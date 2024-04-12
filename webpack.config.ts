import path from "path";
import HTMLWebpackPlugin from "html-webpack-plugin";
import ESLintWebpackPlugin from "eslint-webpack-plugin";
import TerserWebpackPlugin from "terser-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import webpack, { DefinePlugin, ProgressPlugin } from "webpack";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";

const isDev = process.env.NODE_ENV === "development";
const isProd = process.env.NODE_ENV === "production";

const minimizeOptimization = () => {
	if (isProd) {
		return {
			minimize: true,
			minimizer: [
				new TerserWebpackPlugin({
					extractComments: false,
					terserOptions: {
						format: {
							comments: false,
						},
					},
				}),
			],
		};
	}
	return {};
};

const config: webpack.Configuration & DevServerConfiguration = {
	mode: "production",
	entry: path.resolve(__dirname, "src", "index.tsx"),
	output: {
		filename: "[name].[contenthash].js",
		chunkFilename: (pathData) => {
			let chunkName = (pathData?.chunk?.id as string)?.split("_").reverse()[1];

			if (chunkName === "index") {
				const additionalName = (pathData?.chunk?.id as string)?.split("_").reverse()[2];
				chunkName = `${additionalName}.${chunkName}`;
			}

			return `${chunkName}.[contenthash].js`;
		},
		path: path.resolve(__dirname, "build"),
		clean: true,
		publicPath: "/",
	},
	resolve: {
		modules: [path.resolve(__dirname, "src"), path.resolve(__dirname, "node_modules")],
		extensions: [".tsx", ".ts", ".js"],
	},
	devServer: {
		port: 3000,
		hot: true,
		open: true,
		client: {
			overlay: {
				errors: false,
				warnings: false,
			},
			logging: "warn",
		},
		historyApiFallback: true,
	},
	devtool: isDev ? "eval-cheap-module-source-map" : undefined,
	plugins: [
		new HTMLWebpackPlugin({
			template: path.resolve(__dirname, "public", "index.html"),
			favicon: path.resolve(__dirname, "public", "favicon.svg"),
		}),
		new ESLintWebpackPlugin({
			extensions: ["ts", "tsx"],
			overrideConfigFile: path.resolve(__dirname, ".eslintrc.json"),
		}),
		new CopyWebpackPlugin({
			patterns: [
				{ from: path.resolve(__dirname, "config", "app", "config.json"), to: path.resolve(__dirname, "build") },
			],
		}),
		new DefinePlugin({
			__IS_DEV__: JSON.stringify(isDev),
		}),
		isDev && new ProgressPlugin(),
		isDev && new ReactRefreshWebpackPlugin(),
	].filter(Boolean),
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: "babel-loader",
						options: {
							cacheDirectory: true,
							plugins: [isDev && require.resolve("react-refresh/babel")].filter(Boolean),
						},
					},
				],
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"],
			},
			{
				test: /\.svg$/,
				use: ["@svgr/webpack"],
			},
			{
				test: /\.(png|jpe?g|gif|woff2|woff)$/i,
				use: ["file-loader"],
			},
		],
	},
	optimization: {
		...minimizeOptimization(),
		chunkIds: "named",
		splitChunks: {
			cacheGroups: {
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					name: "vendors",
					chunks: "all",
					reuseExistingChunk: true,
				},
			},
		},
	},
	performance: {
		maxEntrypointSize: 768000,
		maxAssetSize: 768000,
	},
};

export default config;
