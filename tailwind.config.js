/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        med: {
          teal: "#0F766E",
          "teal-hover": "#115E59",
          "teal-light": "#F0FDFA",
          "teal-muted": "#CCFBF1",
          emerald: "#10B981",
          navy: "#0F172A",
          slate: "#334155",
          amber: "#F59E0B",
          rose: "#EF4444",
          surface: "#F8FAFC",
          card: "#FFFFFF",
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(15, 23, 42, 0.06)',
        'float': '0 10px 30px -4px rgba(15, 118, 110, 0.2)',
        'phone': '0 25px 60px -15px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scan': 'scan 2.2s ease-in-out infinite alternate',
      },
      keyframes: {
        scan: {
          '0%': { top: '8%' },
          '100%': { top: '90%' },
        }
      }
    },
  },
  plugins: [],
}
