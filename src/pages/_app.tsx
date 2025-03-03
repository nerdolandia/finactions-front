import { AuthProvider } from "@/lib/context/AuthContext"
import AppProvider from "@/lib/providers/AppProvider"
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
