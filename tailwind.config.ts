import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      colors: {
        milky_white: "#F5EEE6",
        water_blue: "#378FC1",
        juicy_orange: "#E56A40",
        bananan: "#E9B65D",
        gray1: "#A1A1A1",
      },
      fontFamily: {
        dgm: ["DungGeunMo"],
        jeju: ["EF_jejudoldam"],
        neol: ["NanumSquareNeoLight"],
        neo: ["NanumSquareNeo"],
        neob: ["NanumSquareNeoBold"],
        neoeb: ["NanumSquareNeoExtraBold"],
      },
      keyframes: {
        FadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "0" },
        },
        EyeMoving: {
          "0%": { transform: "translateX(0%)" },
          "50%": { transform: "translateX(10%)" },
          "100%": { transform: "translateX(0%)" },
        },

        MoveIn: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(5%)" },
        },
        MoveOut: {
          "0%": { transform: "translateX(5%)" },
          "100%": { transform: "translateX(100%)" },
        },
        MovingAround: {
          "0%": { transform: "translateX(0%) translateY(0%)" },
          "50%": { transform: "translateX(-40%) translateY(-10%)" },
          "100%": { transform: "translateX(0%) translateY(0%)" },
        },
        Loading: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        MoveUp: {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0%)" },
        },
        PopOut: {
          "0%": { transform: "translateX(-0.5rem) translateY(-0.5rem)" },
          "100%": { transform: "translateX(0) translateY(0)" },
        },
      },
      animation: {
        FadeIn: "FadeIn 2s forwards",
        MoveIn: "MoveIn 1s forwards",
        MoveOut: "MoveOut 1s forwards",
        MovingAround: "MovingAround 1s infinite",
        EyeMoving: "EyeMoving 10s infinite",
        Loading: "Loading 2s infinite",
        MoveUp: "MoveUp 1s forwards",
        PopOut: "PopOut 0.5s forwards",
      },
    },
  },
  plugins: [],
};
export default config;
