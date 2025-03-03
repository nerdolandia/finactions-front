import { ThemeProvider } from "@emotion/react"
import { CssBaseline } from "@mui/material"
import { ReactNode } from "react"
import { useAuth } from "../context/AuthContext"
import { MenuProvider } from "../context/MenuContext"
import theme from "../style/theme"
import themeUnauthenticated from "../style/theme.auth"


interface AppProviderProps {
  children: ReactNode
}

function AppProvider({ children }: AppProviderProps) {
  const { isAuthenticated, isLoading } = useAuth() // Obtém o estado de autenticação

  // Escolhe o tema com base no estado de autenticação
  const currentTheme = isAuthenticated ? theme : themeUnauthenticated

  if (isLoading) {
    return <p>Carregando...</p>
  }

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <MenuProvider>{children}</MenuProvider>
    </ThemeProvider>
  )
}

export default AppProvider
