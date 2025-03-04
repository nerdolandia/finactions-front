// AuthContext.tsx
import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from 'react'
import { parseCookies, destroyCookie } from 'nookies' // Import parseCookies
import { getData } from '../../utils/api'
import { useRouter } from 'next/navigation'

interface AuthContextProps {
  isAuthenticated: boolean
  setIsAuthenticated: (value: boolean) => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  setIsAuthenticated: () => { },
  isLoading: true,
})

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter() // Initialize useRouter


  useEffect(() => {
    console.log('useEffect - AuthProvider')
    const checkAuthentication = async () => {
      setIsLoading(true)

      try {
        const cookies = parseCookies() // Use parseCookies
        console.log(cookies)
        debugger
        const token = cookies.jwt // Access the cookie by name

        if (token == undefined) {
          console.log('No JWT token found in cookies.')
          setIsAuthenticated(false)
        }

        const response = await getData('/identity/manage/info', token)

        if (response.status === 200) {
          setIsAuthenticated(true)
        } else {

          console.log(
            'Authentication failed.  API returned status:',
            response.status,
          )
          setIsAuthenticated(false)
          destroyCookie(null, 'jwt') // Remove the cookie if authentication fails
          router.push('/login')
        }
      } catch (error) {
        console.error('Error verifying authentication:', error)
        setIsAuthenticated(false)
        destroyCookie(null, 'jwt')
        router.push('/login')
      } finally {
        setIsLoading(false)
      }
    }

    checkAuthentication()
  }, [])

  const value: AuthContextProps = {
    isAuthenticated,
    setIsAuthenticated,
    isLoading,
  }

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
