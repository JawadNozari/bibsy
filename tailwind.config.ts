import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
		},
	},
	plugins: [
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		({ addUtilities }: { addUtilities: any }) => {
			const newUtilities = {
				".sleek-scrollbar::-webkit-scrollbar": {
					backgroundColor: "#333333",
					borderRadius: "10px",
					width: "9px",
				},
				".sleek-scrollbar::-webkit-scrollbar-thumb": {
					backgroundColor: "#222222",
					borderRadius: "10px",
				},
				".no-scrollbar::-webkit-scrollbar": {
					backgroundColor: "transparent",
				},
				".no-scrollbar": {
					"-ms-overflow-style": "var(--tw-gradient-stops)",
					"scrollbar-width": "none",
				},
			};
			addUtilities(newUtilities);
		},
		require("daisyui"),
	],
};
export default config;
