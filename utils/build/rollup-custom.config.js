const fs = require("fs");
const path = require("path");

const resolveFromRoot = (...args) =>
	path.resolve(__dirname, "..", "..", ...args);

export default {
	input: resolveFromRoot("entry/index.js"),
	treeshake: false,
	plugins: [
		{
			generateBundle: (options, bundle) => {
				for (const key in bundle) {
					bundle[key].code = bundle[key].code.replace(
						/three_module_js/g,
						"THREE"
					);
				}
			},
		},
	],
	output: {
		format: "umd",
		name: "THREE",
		file: resolveFromRoot("export/index.js"),
		globals: () => "THREE",
		paths: (p) => (/three\.module\.js$/.test(p) ? "three" : p),
		extend: true,
		esModule: false,
	},
};
