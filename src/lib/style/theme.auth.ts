// styles/theme.unauthenticated.ts (tema para não autenticados)
import { createTheme } from '@mui/material/styles'
import { PaletteMode } from '@mui/material'

const themeUnauthenticated = createTheme({
  palette: {
    mode: 'dark' as PaletteMode,
    // primary: {
    //   main: '#6c757d', // Cor primária diferente para não autenticados
    // },
    // background: {
    //   default: '#f8f9fa', // Cor de fundo diferente
    // },
  },
  // Outras personalizações específicas para não autenticados
})

export default themeUnauthenticated
