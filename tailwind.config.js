/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        //BACKGROUNDS
        'main-blue': '#1877f2',
        'main-white': '#f5f5f5',
        'bg-error': '#ffebe8',
        'bg-cancel': '#e4e6eb',
        'bg-icons': '#e4e6eb',
        'bg-text-hover': '#e6e6e6',

        //BORDERS
        'br-error': '#dd3c10',

        //TEXTOS
        'txt-dark': '#333',
        'semi-dark': '#1c1e21',
        'gray-100': '#606770',
        'primary-text': '#050505',
        
        //ICONS
        'primary-icon': '#050505',
        'secondary-icon': '#BCC0C4'


      }

    },
  },
  plugins: [
    require('flowbite/plugin')

  ],
}

