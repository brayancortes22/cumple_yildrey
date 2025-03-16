module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        'gradient-x': 'gradient-x 15s ease infinite',
        'float-up': 'float-up 3s ease-in forwards',
        'float-heart': 'float-heart 4s ease-in infinite',
        'pulse': 'pulse 2s infinite',
        'bounce': 'bounce 2s infinite',
        'rainbow': 'rainbow 4s infinite',
        'dance': 'dance 1s infinite',
        'dance-reverse': 'dance 1s infinite reverse',
        'fadeIn': 'fadeIn 0.5s ease-in-out',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'float-up': {
          '0%': { transform: 'translateY(0) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(-100vh) rotate(360deg)', opacity: '0' },
        },
        'float-heart': {
          '0%': { transform: 'translateY(100vh) scale(0)', opacity: '1' },
          '100%': { transform: 'translateY(-100vh) scale(1)', opacity: '0' },
        },
        'bounce': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'rainbow': {
          '0%': { color: '#ff6b6b' },
          '25%': { color: '#ffd93d' },
          '50%': { color: '#6c5ce7' },
          '75%': { color: '#a8e6cf' },
          '100%': { color: '#ff6b6b' },
        },
        'dance': {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '25%': { transform: 'translateY(-5px) rotate(10deg)' },
          '75%': { transform: 'translateY(5px) rotate(-10deg)' },
        },
        'fadeIn': {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
} 