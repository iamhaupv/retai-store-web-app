/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js}"],
    theme: {
      extend: {
        spacing: {
          'lvw': '390vw', // Hoặc một giá trị chiều rộng bạn muốn
        },
      },
    },
    plugins: [
        require('daisyui'),
    ],
  }