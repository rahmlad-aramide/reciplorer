import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
	'./@/**/*.{ts,tsx}',
  ],
  theme: {
  	extend: {
  		colors: {
			primary: '#1A4D2E',
			secondary: '#F58700',
			neutral: {
				100: '#F5F5F5',
				400: '#8F8E91',
				600: '#49474D',
				800: '#242128',
			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
		  listStyleType: {
			circle: 'circle',
		  }
  	}
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
