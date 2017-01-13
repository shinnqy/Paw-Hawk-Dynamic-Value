module.exports = {
    entry: "./PawHawkDynamicValue.js",
    output: {
        path: __dirname,
        filename: "/dist/com.shinn.PawExtensions.PawHawkDynamicValue/PawHawkDynamicValue.js"
    },
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
        ]
    }
};