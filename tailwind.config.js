/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/*.{ts,tsx}",
    "./src/components/*.{ts,tsx}",
    "./src/components/ui/*.{ts,tsx}",
    "./src/pages/*.{ts,tsx}",
  ],
  theme: {
    fontSize: {
      h1: ["18px", { fontWeight: "bold" }],
      h2: ["16px", { fontWeight: "bold" }],
      h3: ["14px", { fontWeight: "bold" }],
      p: ["14px", { fontWeight: "500" }],
      sm: ["12px", { fontWeight: "normal" }],
    },
    extend: {
      fontFamily: {
        sans: ["Pretendard Variable", "sans-serif"],
      },
      colors: {
        gray0: "#E6E6E6",
        gray1: "#B3B3B3",
        gray2: "#808080",
        gray3: "#4C4C4C",
        gray4: "#191919",
        textGray1: "#191919",
        textGray2: "#B3B3B3",
        textGray3: "#FFFFFF",
        main: "#37A041",
        darkRed: "#EA000E",
      },
    },
  },
  plugins: [],
};
