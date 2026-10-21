/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: ['./index.html', './src/**/*.{js,jsx}'],
    theme: {
        container: {
            center: true,
            padding: 'var(--spacing-page)',
            screens: {
                '2xl': '1400px',
            },
        },
        extend: {
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
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))',
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))',
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))',
                },
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))',
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))',
                },
            },
            fontFamily: {
                sans: ['var(--font-sans)', 'sans-serif'],
                display: ['var(--font-display)', 'serif'],
            },
            fontSize: {
                xs: ['var(--font-size-xs)', { lineHeight: 'var(--line-height-xs)' }],
                sm: ['var(--font-size-sm)', { lineHeight: 'var(--line-height-sm)' }],
                base: ['var(--font-size-base)', { lineHeight: 'var(--line-height-base)' }],
                lg: ['var(--font-size-lg)', { lineHeight: 'var(--line-height-lg)' }],
                xl: ['var(--font-size-xl)', { lineHeight: 'var(--line-height-xl)' }],
                '2xl': ['var(--font-size-2xl)', { lineHeight: 'var(--line-height-2xl)' }],
                '3xl': ['var(--font-size-3xl)', { lineHeight: 'var(--line-height-3xl)' }],
                '4xl': ['var(--font-size-4xl)', { lineHeight: 'var(--line-height-4xl)' }],
            },
            spacing: {
                control: 'var(--spacing-control)',
                section: 'var(--spacing-section)',
                page: 'var(--spacing-page)',
            },
            borderRadius: {
                sm: 'var(--radius-sm)',
                md: 'var(--radius-md)',
                lg: 'var(--radius-lg)',
                xl: 'var(--radius-xl)',
            },
            boxShadow: {
                soft: 'var(--shadow-soft)',
                card: 'var(--shadow-card)',
                overlay: 'var(--shadow-overlay)',
            },
        },
    },
    plugins: [],
}
