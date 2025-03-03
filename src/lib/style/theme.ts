// styles/theme.ts
import { createTheme } from '@mui/material/styles'
import { PaletteMode } from '@mui/material'

const theme = createTheme({
  palette: {
    mode: 'light' as PaletteMode, // Ou 'dark'
    primary: {
      main: '#1976d2',
    },
  },
})

export default theme
