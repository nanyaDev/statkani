module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        pink: '#FF00AA',
        blue: '#00AAFF',
        purple: '#A100F1',
        bg: '#050B20',
        fg: '#11162D',
        gray: {
          1: '#F4F4F4',
          2: '#E0E0E0',
          3: '#555555',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
