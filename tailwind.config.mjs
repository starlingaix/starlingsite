/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink:     '#050505',
        'ink-2': '#0d0d0d',
        'ink-3': '#141414',
        'ink-4': '#1c1c1c',
        orange: {
          DEFAULT: '#f97316',
          dim:     'rgba(249,115,22,0.12)',
          glow:    'rgba(249,115,22,0.28)',
        },
        'g-text':   '#a1a1aa',
        'g-dim':    '#52525b',
        'b-subtle': 'rgba(255,255,255,0.07)',
        'b-mid':    'rgba(255,255,255,0.13)',
      },
      fontFamily: {
        serif: ['DM Serif Display', 'Georgia', 'serif'],
        sans:  ['DM Sans', 'system-ui', 'sans-serif'],
        mono:  ['JetBrains Mono', 'Menlo', 'monospace'],
      },
      maxWidth: { site: '1200px' },
    },
  },
  plugins: [],
};
