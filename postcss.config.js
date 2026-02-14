// PostCSS config — must use CommonJS module.exports (not ESM export default)
// Next.js font loader requires this format on all platforms
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
