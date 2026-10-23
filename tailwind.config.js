const c = (v) => `rgb(var(${v}) / <alpha-value>)`
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: { bg: c('--bg'), bg2: c('--bg2'), fg: c('--fg'), muted: c('--muted'),
        violet: '#8B5CF6', electric: '#3B82F6', aqua: '#06B6D4' },
      fontFamily: { sans: ['Inter', 'Poppins', 'system-ui', 'sans-serif'] },
    },
  },
  plugins: [],
}
