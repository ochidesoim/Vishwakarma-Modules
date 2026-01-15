/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#0a0e14', // Deep Space
          panel: '#151a23',   // Panel Dark
          surface: '#1e2530', // Surface
        },
        border: {
          DEFAULT: '#2d3748',
        },
        primary: {
          DEFAULT: '#00d9ff', // Cyan
          hover: '#00b3d6',
        },
        accent: {
          orange: '#ff6b35',
          blue: '#00aaff',    // Electric Blue
        },
        status: {
          success: '#00ff88',
          warning: '#ffbb00',
          critical: '#ff4444',
          info: '#4a9eff',
        }
      },
      fontFamily: {
        display: ['Orbitron', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
