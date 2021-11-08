module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    backgroundColor: (theme) => ({
      ...theme("colors"),
      primary: "#12192C",
      secondary: "#F5A623",
      danger: "#EDEDED",
    }),
    extends: {
      colors: {
        primary: "#12192C",
        secondary: "#F5A623",
        danger: "#EDEDED",
      },
    },
    fontFamily: {
      quicksand: ["Quicksand"],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
