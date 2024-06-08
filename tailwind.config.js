/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "black" : "#000000",
        "white" : "#FFFFFF",

        "brown-1" : '#323232',
        "brown-2" : '#54433A',
        "brown-3" : "#BCA79C",

        "gray-1" : "#828282",
        "gray-2" : "#8C8C8C",
        "gray-3" : "#BFBFBF",

        "danger" : "#E32222",
        "warning" : "#E36F22"
      },
      screens: {
        xs: '400px',
        '3xl': '1680px',
        '4xl': '2200px',
      },
      maxWidth: {
        '10xl': '1512px',
      },
    },
  },
  plugins: [],
};
