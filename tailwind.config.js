/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",   // if using App Router
        "./components/**/*.{js,ts,jsx,tsx}",
      ],
    theme: {
      extend: {
        colors: {
            blue: {
                500: "#2997FF", // Use it like bg-blue-500
            },
          gray: {
            DEFAULT: "#86868b",
            100: "#94928d",
            200: "#afafaf",
            300: "#42424570",
          },
          zinc: "#101010",
        },
      },
    },
    plugins: [],
  };