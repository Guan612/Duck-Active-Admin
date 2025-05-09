/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue}"],
	theme: {
		extend: {
			colors: {
				transblue: "#5BCEFA",
				transpink: "#F5A9B8",
			},
      height: {
        '1/10': '10%', // 将 1/10 高度设置为 10%
      },
		},
	},
	plugins: [],
};
