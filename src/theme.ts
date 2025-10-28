import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

const theme = extendTheme({
  config,
  colors: {
    brand: {
      50: '#e6f7f7',
      100: '#b3e7e6',
      200: '#80d7d5',
      300: '#4dc7c4',
      400: '#26b7b3',
      500: '#319795',
      600: '#2c7a78',
      700: '#265d5c',
      800: '#1f4140',
      900: '#182423',
    },
  },
  styles: {
    global: {
      body: {
        bg: 'gray.50',
      },
    },
  },
})

export default theme

