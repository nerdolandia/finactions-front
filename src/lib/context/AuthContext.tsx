// AuthContext.tsx
import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from 'react'
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import { getData } from '../utils/api'

interface AuthContextProps {
  isAuthenticated: boolean
  setIsAuthenticated: (value: boolean) => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  setIsAuthenticated: () => { },
  isLoading: true, // Inicialmente, consideramos que está carregando
})

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuthentication = async () => {
      setIsLoading(true) // Começa o carregamento

      try {
        const cookies = parseCookies()
        const token = cookies.jwt

        if (!token) {
          setIsAuthenticated(false)
          setIsLoading(false) // Termina o carregamento
          return
        }

        // Substitua 'SEU_ENDPOINT' pelo endpoint real da sua API

        const response = await getData('/identity/manage/info', token)

        if (response.status === 200) {
          setIsAuthenticated(true)
        } else {
          setIsAuthenticated(false)
          destroyCookie(null, 'jwt') // Remove o cookie se a autenticação falhar
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error)
        setIsAuthenticated(false)
        destroyCookie(null, 'jwt') // Remove o cookie em caso de erro
      } finally {
        setIsLoading(false) // Termina o carregamento, independentemente do resultado
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























// import { createContext, useContext, useState, ReactNode, useEffect } from "react"
// import axios from "axios"
// import { setCookie, destroyCookie, parseCookies } from "cookies"

// interface AuthContextType {
//   isAuthenticated: boolean
//   login: (username: string, password: string) => Promise<void>
//   logout: () => void
// }

// interface AuthModel {
//   api_token: string
//   refreshToken?: string
//   // user?: User
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined)

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
//     const cookies = parseCookies()
//     return cookies.isAuthenticated === "true"
//   })

//   const login = async (username: string, password: string) => {
//     try {
//       const response = await axios.post("/api/identity/login", {
//         userName: username,
//         password: password,
//       })
//       const { api_token } = response.data
//       setCookie(null, "api_token", api_token, { path: "/" })
//       setCookie(null, "isAuthenticated", "true", { path: "/" })
//       setIsAuthenticated(true)
//     } catch (error) {
//       console.error("Login failed", error)
//     }
//   }

//   const logout = () => {
//     setIsAuthenticated(false)
//     destroyCookie(null, "api_token")
//     destroyCookie(null, "isAuthenticated")
//   }

//   useEffect(() => {
//     const cookies = parseCookies()
//     if (cookies.isAuthenticated === "true") {
//       setIsAuthenticated(true)
//     }
//   }, [])

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   )
// }

// export const useAuth = () => {
//   const context = useContext(AuthContext)
//   if (context === undefined) {
//     throw new Error("useAuth must be used within an AuthProvider")
//   }
//   return context
// }


