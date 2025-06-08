import { defineConfig, presetUno, presetWebFonts } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetWebFonts({
      fonts: {
        // Arabic fonts
        cairo: 'Cairo:400,500,600,700',
        changa: 'Changa:400,500,600,700',
        // English fallbacks
        poppins: 'Poppins:400,500,600,700',
        inter: 'Inter:400,500,600,700'
      }
    })
  ],
  theme: {
    colors: {
      // Islamic Mission City Color Palette
      emerald: {
        50: '#e6f7f5',
        100: '#ccefeb',
        500: '#00695C',
        600: '#004d43',
        700: '#003d35'
      },
      navy: {
        50: '#f0f4f8',
        100: '#d9e2ec',
        500: '#0A192F',
        600: '#081420',
        700: '#060f18'
      },
      gold: {
        50: '#faf8f3',
        100: '#f5f1e7',
        500: '#C5A66A',
        600: '#b8954d',
        700: '#9d7f3f'
      },
      beige: {
        50: '#fefefe',
        100: '#fdfdfc',
        500: '#F8F5F0',
        600: '#f0ebe3',
        700: '#e8e1d6'
      },
      crimson: {
        50: '#fdf2f2',
        100: '#fce5e5',
        500: '#B00020',
        600: '#9d001c',
        700: '#7a0015'
      }
    },
    fontFamily: {
      arabic: ['Cairo', 'Changa', 'system-ui', 'sans-serif'],
      english: ['Poppins', 'Inter', 'system-ui', 'sans-serif']
    }
  },
  shortcuts: {
    // RTL utilities
    'rtl-mr': 'mr-0 ml-auto',
    'rtl-ml': 'ml-0 mr-auto',
    'rtl-pr': 'pr-0 pl-auto',
    'rtl-pl': 'pl-0 pr-auto',
    
    // Islamic geometric patterns
    'islamic-pattern': 'bg-gradient-to-br from-emerald-50 to-gold-50',
    'mashrabiya-border': 'border-2 border-gold-500 border-opacity-30',
    
    // Common card styles
    'card-base': 'bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300',
    'card-islamic': 'card-base mashrabiya-border p-6',
    
    // Button styles
    'btn-primary': 'bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200',
    'btn-secondary': 'bg-gold-500 hover:bg-gold-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200',
    
    // Text styles
    'text-arabic': 'font-arabic text-right',
    'text-english': 'font-english text-left',
    'heading-arabic': 'font-arabic font-bold text-right',
    'heading-english': 'font-english font-bold text-left'
  },
  rules: [
    // Custom RTL rules
    ['rtl-space-x-reverse', { 'space-x-reverse': '1' }],
    ['rtl-divide-x-reverse', { 'divide-x-reverse': '1' }],
  ]
})
