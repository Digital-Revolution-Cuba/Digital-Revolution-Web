/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        'saira-stencil': ["'Saira Stencil One', sans-serif"],
        'barlow-semi-condensed': ["'Barlow Semi Condensed', sans-serif"],
        'rubik': ["'Rubik', sans-serif"],
      },
      fontWeight: {
        thin: '100',
        extralight: '200',
        light: '300',
        regular: '400',
      }
    },
  },
  plugins: [],
}
