const defaultTheme = require("tailwindcss/defaultTheme");
 
const colors = require("tailwindcss/colors");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content:
    [
      "./src/**/*.{ts,tsx}",
      "./src/**/*.css"
    ],
  theme: {
  	extend: {
			boxShadow: {
				room: '0 4px 8px rgba(0, 0, 0, 0.2)',
				bubble: '0 4px 6px rgba(0,0,0,0.1)'
			},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)',
				room: '2px solid rgba(47,47,42,0.726)',
  		},
  		colors: {
			coolGrey: 'rgba(47,47,42,0.426)',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
				btn: {
					DEFAULT: 'conic-gradient(var(--gradient-angle) , rgb(17, 188, 51), rgb(5, 180, 118), rgb(8, 175, 167), rgb(5, 180, 118),  rgb(17, 188, 51))'
				},
  			primary: {
  				DEFAULT: 'hsl(240, 8, 12)',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(222, 100, 55)',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(28, 100%, 53%)',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
				bubble: '1px solid rgba(255, 255, 255, 0.1)',
				bg_bubble: 'rgba(40, 40, 40, 0.95)',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		animation: {
  			grid: 'grid 15s linear infinite',
				rotation: 'rotation 1s linear infinite'
  		},
  		keyframes: {
  			grid: {
  				'0%': {
  					transform: 'translateY(-50%)'
  				},
  				'100%': {
  					transform: 'translateY(0)'
  				}
  			},
				rotation: {
					'0%': {
						transform: '--gradient-angle(0deg)'
					},
					'100%': {
						transform: '--gradient-angle(360deg)'
					}
				}
  		}
  	}
  },
  plugins: [require("tailwindcss-animate"), addVariablesForColors],
}


function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );
 
  addBase({
    ":root": newVars,
  });
}

