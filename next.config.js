module.exports = {
	webpack(config) {
		config.resolve.fallback = {
			// if you miss it, all the other options in fallback, specified
			// by next.js will be dropped.
			...config.resolve.fallback,

			fs: false, // the solution
		};

		return config;
	},
	images: {
		domains: [
			"pbs.twimg.com",
			"www.gravatar.com",
			"books.google.com",
			"lh3.googleusercontent.com",
			"ui-avatars.com",
			"cloudflare-ipfs.com",
			"avatars.githubusercontent.com",
		],
	},
};
