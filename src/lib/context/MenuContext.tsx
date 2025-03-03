// MenuContext.tsx
import {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
} from 'react'

// Define a interface para o contexto do menu
interface MenuContextProps {
  selectedRoute: string
  setSelectedRoute: Dispatch<SetStateAction<string>>
}

// Cria o contexto com um valor padrão (pode ser null ou um objeto inicial)
const MenuContext = createContext<MenuContextProps>({
  selectedRoute: '/',
  setSelectedRoute: () => { }, // Função vazia para evitar erros iniciais
})

// Define o tipo para o provider
interface MenuProviderProps {
  children: React.ReactNode
}

export const MenuProvider = ({ children }: MenuProviderProps) => {
  const [selectedRoute, setSelectedRoute] = useState<string>('/')

  const value: MenuContextProps = {
    selectedRoute,
    setSelectedRoute,
  }

  return (
    <MenuContext.Provider value={value}>{children}</MenuContext.Provider>
  )
}

// Hook personalizado para usar o contexto
export const useMenu = (): MenuContextProps => {
  return useContext(MenuContext)
}
