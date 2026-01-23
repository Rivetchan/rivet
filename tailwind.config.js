/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './js/**/*.js'],

  // 🔥 INI YANG WAJIB DITAMBAHKAN
  safelist: [
    // background progress
    'bg-cyan-500',
    'bg-yellow-500',
    'bg-orange-500',
    'bg-green-500',
    'bg-blue-500',
    'bg-red-500',
    'bg-gray-500',

    // text
    'text-cyan-400',
    'text-yellow-400',
    'text-orange-400',
    'text-green-400',
    'text-blue-400',
    'text-red-400',
    'text-gray-400',

    // badge background
    'bg-cyan-500/10',
    'bg-yellow-500/10',
    'bg-orange-500/10',
    'bg-green-500/10',
    'bg-blue-500/10',
    'bg-red-500/10',

    // border badge
    'border-cyan-500/30',
    'border-yellow-500/30',
    'border-orange-500/30',
    'border-green-500/30',
    'border-blue-500/30',
    'border-red-500/30',
  ],

  darkMode: 'class',

  theme: {
    extend: {
      colors: {
        neon: {
          cyan: '#00ffff',
          purple: '#8b5cf6',
          green: '#00ff9c',
        },
        cyber: {
          dark: '#0a0a0f',
          navy: '#111827',
          gray: '#1f2937',
        },
      },
      fontFamily: {
        'share-tech': ['Share Tech Mono', 'monospace'],
        orbitron: ['Orbitron', 'sans-serif'],
        exo: ['Exo 2', 'sans-serif'],
      },
      animation: {
        'neon-pulse': 'neon-pulse 2s ease-in-out infinite',
        float: 'float 3s ease-in-out infinite',
        glitch: 'glitch 0.5s infinite',
      },
      keyframes: {
        'neon-pulse': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glitch: {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
          '100%': { transform: 'translate(0)' },
        },
      },
      backgroundImage: {
        'cyber-grid':
          "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300ffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        'neon-gradient': 'linear-gradient(90deg, #00ffff, #8b5cf6, #00ff9c)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
