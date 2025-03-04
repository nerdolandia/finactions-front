import Menu from "@/lib/components/Menu"
import { AuthProvider } from "@/lib/config/context/AuthContext"
import AppProvider from "@/lib/config/providers/AppProvider"
import { AppProps } from "next/app"


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </AuthProvider>
  )
}

export default MyApp
