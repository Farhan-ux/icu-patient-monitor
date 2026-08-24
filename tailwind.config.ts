import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#060b18',
          card: '#0d1526',
          panel: '#111b2e',
          border: '#1a2744',
        },
        vital: {
          green: '#00e676',
          cyan: '#00e5ff',
          amber: '#ffab00',
          red: '#ff1744',
          blue: '#448aff',
          purple: '#b388ff',
          pink: '#ff80ab',
        },
        clinical: {
          normal: '#00e676',
          warning: '#ffab00',
          critical: '#ff1744',
          info: '#448aff',
        },
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      keyframes: {
        pulse_vital: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        alarm_flash: {
          '0%, 100%': { backgroundColor: 'rgba(255,23,68,0.1)' },
          '50%': { backgroundColor: 'rgba(255,23,68,0.3)' },
        },
        ecg_scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        beep: {
          '0%': { transform: 'scale(1)' },
          '15%': { transform: 'scale(1.3)' },
          '30%': { transform: 'scale(1)' },
        },
      },
      animation: {
        pulse_vital: 'pulse_vital 1.5s ease-in-out infinite',
        alarm_flash: 'alarm_flash 1s ease-in-out infinite',
        beep: 'beep 0.8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
export default config;
