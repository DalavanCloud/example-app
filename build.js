require = require("enhanced-require")(module);

var webpack = require("webpack");
var webpackFormatOutput = require("webpack/lib/formatOutput");

console.log("compiling javascript...");
webpack(__dirname, "./lib/client.js", require("./build.json"), function(err, result) {
	if(err) throw err;
	var hash = result.hash;
	var raw = webpackFormatOutput(result, {colors: false, context: __dirname});
	var pretty = webpackFormatOutput(result, {colors: true, context: __dirname});
	console.log(pretty);
	console.log("compiling index.jade...");
	require("fs").writeFile("index.html", require("./index.jade")({output: raw, hash: hash}), "utf-8", function(err) {
		console.log("Ok");
	});
});
