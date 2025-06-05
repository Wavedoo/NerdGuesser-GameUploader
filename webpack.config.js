const path = require("path");

module.exports = {
    entry: {
        main: "/website/typescript/main.ts",
        game: "/website/typescript/gameUploader.ts",
        name: "/website/typescript/nameUploader.ts"
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: [ '.tsx', '.ts', '.js' ],
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'website/lib'),
    },
    mode: "development"
}