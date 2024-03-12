/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        font: "Inter",
        fontHeading: "Inter",
      },
      colors: {
        primary: "#F7630C ",
        secondary: "#FFA026",
        color: "#FFFFFF",
        colorOpacity: "rgba(255,255,255,0.82)",
        heading: "#FFFFFF",
        bg: "#000",
        bgBox: "rgba(19,19,19,0.8)",
        border: "#656565",
        borderOpacity: "rgba(89,136,255,0.25)",
      },
      flex: {
        auto: "0 0 auto",
      },
      screens: {
        lg: "991px",
        // => @media (min-width: 991px) { ... }
      },
      backgroundImage: {
        main: "url('/public/images/main1.jpg')",
      },
    },
  },
  plugins: [],
};
