const Dotenv = require("dotenv-webpack");
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const getFilesFromDir = require("./utils/getFilesFromDir");
const PAGE_DIR = path.join("src", "pages", path.sep);

const htmlFiles = getFilesFromDir(PAGE_DIR, [".html"]);
const htmlPlugins = htmlFiles.map(filePath => {
    const fileName = filePath.replace(PAGE_DIR, "");
    return new HtmlWebpackPlugin({
        chunks: [fileName.replace(path.extname(fileName), ""), "vendor"],
        template: filePath,
        filename: fileName.toLowerCase()
    })
});

const tsxFiles = getFilesFromDir(PAGE_DIR, [".tsx"]);
const entry = tsxFiles.reduce((obj, filePath) => {
    const entryChunkName = filePath.replace(path.extname(filePath), "").replace(PAGE_DIR, "");
    obj[entryChunkName] = `./${filePath}`;
    return obj;
}, {});

module.exports = {
    entry,
    resolve: {
        alias: {
            src: path.resolve(__dirname, "src"),
            components: path.resolve(__dirname, "src", "components")
        }
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /node_modules/,
                    chunks: "initial",
                    name: "vendor",
                    enforce: true
                }
            }
        }
    },
    devtool: 'source-map',
    devServer: {
        static: './dist',
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
        new Dotenv({
            systemvars: false,
        }),
        ...htmlPlugins
    ]
}