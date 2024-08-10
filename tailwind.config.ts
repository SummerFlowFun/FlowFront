import type { Config } from "tailwindcss";

const config: Config = {
   content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
   theme: {
      extend: {
         colors: {
            milky_white: "#F5EEE6",
            water_blue: "#378FC1",
            juicy_orange: "#E56A40",
            bananan: "E9B65D",
         },
      },
   },
   plugins: [],
};
export default config;
