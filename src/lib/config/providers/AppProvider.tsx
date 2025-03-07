import { ThemeProvider } from "@emotion/react"
import { Backdrop, Box, CircularProgress, CssBaseline } from "@mui/material"
import { ReactNode, Suspense, useMemo } from "react"
import { useAuth } from "../context/AuthContext"
import { MenuProvider } from "../context/MenuContext"
import theme from "../../style/theme"
import themeUnauthenticated from "../../style/theme.auth"


interface AppProviderProps {
  children: ReactNode
}

function AppProvider({ children }: AppProviderProps) {

  const { isAuthenticated, isLoading } = useAuth() // Obtém o estado de autenticação

  // Escolhe o tema com base no estado de autenticação
  const currentTheme = useMemo(() => {

    console.log('useMemo - AppProvider')
    return isAuthenticated ? theme : themeUnauthenticated
  }, [isAuthenticated])

  if (isLoading) {
    return (<ThemeProvider theme={currentTheme}>

      <Loading /> // Show loading indicator while authenticating
    </ThemeProvider>)
  }


  return (

    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      {isAuthenticated ? (
        <Box sx={{ display: 'flex' }}>
          <MenuProvider>
            <Suspense fallback={<Loading />}>
              {children}
            </Suspense>
          </MenuProvider>
        </Box>
      ) : (
        <Suspense fallback={<Loading />}>{children}</Suspense>
      )}
    </ThemeProvider>
  )
}
function Loading() {
  return (


    <Backdrop
      sx={(theme) => ({
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        zIndex: theme.zIndex.drawer + 1,
      })}
      open={true}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}
export default AppProvider
