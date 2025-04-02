module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1a365d',
          light: '#2c5282',
          dark: '#153e75',
        },
        secondary: {
          DEFAULT: '#2c7a7b',
          light: '#38b2ac',
          dark: '#285e61',
        },
        accent: {
          DEFAULT: '#dd6b20',
          light: '#ed8936',
          dark: '#c05621',
        },
        success: '#38a169',
        warning: '#d69e2e',
        danger: '#e53e3e',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
