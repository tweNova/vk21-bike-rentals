import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                adventure: {
                    bg: '#1B261A',
                    primary: '#2D4234',
                    secondary: '#4A6D43',
                    accent: '#7DA065',
                    mist: '#E9F0F4',
                    sage: '#89A38C',
                    gold: '#FFD700',
                },
            },
            fontFamily: {
                inter: ['var(--font-inter)', 'sans-serif'],
                playfair: ['var(--font-playfair)', 'serif'],
            },
            animation: {
                'ride': 'ride 8s ease-in-out infinite',
                'trail': 'trail 4s ease-in-out infinite',
            },
            keyframes: {
                ride: {
                    '0%, 100%': { transform: 'translateY(0) rotate(0)' },
                    '50%': { transform: 'translateY(-10px) rotate(1deg)' },
                },
                trail: {
                    '0%, 100%': { opacity: '0.4', filter: 'blur(10px)' },
                    '50%': { opacity: '0.8', filter: 'blur(20px)' },
                },
            },
        },
    },
    plugins: [],
};

export default config;
