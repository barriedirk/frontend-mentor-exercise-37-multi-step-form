module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        white: 'hsl(0, 100%, 100%)',
        black: 'hsl(0, 0%, 0%)',

        grey: {
          800: 'hsl(212, 24%, 26%)',
          500: 'hsl(211, 10%, 45%)',
          300: 'hsl(300, 0%, 50%)',
          200: 'hsl(0, 0%, 83%)',
          100: 'hsl(223, 19%, 93%)',
          50: 'hsl(228, 33%, 97%)',
        },

        orange: {
          300: 'hsl(23, 100%, 75%)',
        },

        red: {
          500: 'hsl(354, 84%, 57%)',
          450: 'hsl(353, 76%, 65%)',
          400: 'hsl(354, 91%, 74%)',
        },

        purple: {
          600: 'hsl(243, 100%, 62%)',
          500: 'hsl(243, 100%, 67%)',
          400: 'hsl(243, 100%, 77%)',
          200: 'hsl(229, 24%, 87%)',
        },

        blue: {
          950: 'hsl(213, 96%, 18%)',
          700: 'hsl(213, 73%, 31%)',
          300: 'hsl(228, 100%, 84%)',
          200: 'hsl(206, 94%, 87%)',
          100: 'hsl(218, 100%, 97%)',
          50: 'hsl(231, 100%, 99%)',
        },
      },
      fontFamily: {
        sans: ['Ubuntu', 'sans-serif'],
      },
      fontSize: {
        100: '6.25rem',
        96: '6rem',
        80: '5rem',
        72: '4.5rem',
        56: '3.5rem',
        48: '3rem',
        40: '2.5rem',
        32: '2rem',
        28: '1.75rem',
        24: '1.5rem',
        20: '1.25rem',
        18: '1.125rem',
        16: '1rem',
        14: '0.875rem',
        13: '0.8125rem',
        12: '0.75rem',
        11: '0.6875rem',
      },
      fontWeight: {
        thin: '100',
        extralight: '200',
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        black: '900',
      },
      lineHeight: {
        120: '1.2',
        150: '1.5',
      },
      letterSpacing: {
        0: '0px',
        1: '1px',
      },
    },
  },
  plugins: [],
};
