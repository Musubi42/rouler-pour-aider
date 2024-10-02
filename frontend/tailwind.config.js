/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
    "./blocks/**/*.{vue,js}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "footer-job": "url('/assets/images/footer-job.png')",
        "footer-tuned": "url('/assets/images/footer-tuned.png')",
        "footer-questions": "url('/assets/images/footer-questions.png')",
        "fond-tableau": "url('/assets/images/BG-tableau.png')",
        "logo-small": "url('/assets/images/logo-small.jpeg')",
      },
      colors: {
        primary: "#72BC7A",
        secondary: "#2A5FA4",
        "lilas-pop": "#974dff",
        "rose-neon": "#ff0066",
        "bleu-ciel": "#99deff",
        "jaune-citron": "#ffff00",
      },
      fontFamily: {
        montserrat: ["Montserrat", "Arial", "sans-serif"],
      },
      animation: {
        "spin-slow": "spin 8s linear infinite",
      },
      overflow: {
        unset: "unset",
      },
    },
  },
  safelist: ["lilas-pop", "rose-neon", "bleu-ciel", "jaune-citron", "w-20", "font-semibold", "overflow-y-scroll", "w-20", "flex-row-reverse", "flex-row", "bg-green-500", "bg-secondary", "rounded-b-xl"],
  plugins: [],
};
