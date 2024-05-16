import type { Config } from 'tailwindcss';
import { createPreset, presets } from 'fumadocs-ui/tailwind-plugin';
const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  presets: [
    createPreset({
      preset: {
        ...presets.default,
        dark: {
          ...presets.default.dark,
          background: '0 0% 2%',
          foreground: '0 0% 98%',
          popover: '0 0% 4%',
          card: '0 0% 4%',
          muted: '0 0% 8%',
          border: '0 0% 14%',
          accent: '0 0% 15%',
          'accent-foreground': '0 0% 100%',
          'muted-foreground': '0 0% 60%',
        },
      },
    }),
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        heading: ['var(--font-heading)'],
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'moveFromRight': {
          from: { right: "%100" },
          to: { right: "0%" },
        },
        'moveToRight': {
          from: { right: "0%" },
          to: { right: "100%" },
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'ripple': {
          "50%": {
            transform: "scale(var(--scale, 1.25))",
          },
        },
        "progress-bar": {
          'from': { width: '0' },
          'to': { width: '100%' },
        },
        fade: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInOut: {
          '0%, 100%': { opacity: '0' },
          '20%, 80%': { opacity: '1' },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
        "marquee-vertical": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-100% - var(--gap)))" },
        },
      },
      animation: {
        'moveFromRight': "moveFromRight 1000ms linear alternate infinite",
        'moveToRight': "moveToRight 1000ms linear alternate infinite",
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'ripple': "ripple var(--duration, 1.5s) ease calc(var(--i, 0)*0.1s) infinite",
        "progress-bar": "progress-bar linear ease-in-out",
        marquee: "marquee var(--duration) linear infinite",
        "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
        
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
