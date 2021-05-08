module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === "production",
     content: [
      "./src/**/*.vue",
      "./src/**/*.pcss",
      "./src/**/*.css",
      "./src/**/*.sass",
      "./src/**/*.html",
      "./src/**/*.js",
      "./src/**/*.ts"
    ],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
       height: {
        "screen/92": "92vh",
        "screen/90": "90vh",
        "screen/2": "50vh",
        "screen/3": "calc(100vh / 3)",
        "screen/4": "calc(100vh / 4)",
        "screen/5": "calc(100vh / 5)",
      },
    },
  },
  variants: {
    extend: {
    },
  },
  plugins: [],
}
