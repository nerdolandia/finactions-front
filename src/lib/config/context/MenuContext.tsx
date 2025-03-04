// MenuContext.tsx
import {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
  useMemo,
} from 'react'
import MenuAppBar from '../../components/layout/MenuAppBar'
import ResponsiveDrawer from '../../components/layout/DrawerLite'
import { Backdrop, Box, styled, Toolbar } from '@mui/material'
import { useRouter } from 'next/navigation'

// Define a interface para o contexto do menu
interface MenuContextProps {
  selectedRoute: string
  navigateToRoute: (route: string) => void // Função para navegação}
}

// Cria o contexto com um valor padrão (pode ser null ou um objeto inicial)
const MenuContext = createContext<MenuContextProps>({
  selectedRoute: '/',
  navigateToRoute: () => { }, // Função vazia para evitar erros
})

// Define o tipo para o provider
interface MenuProviderProps {
  children: React.ReactNode
}

export const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))

export const MenuProvider = ({ children }: MenuProviderProps) => {
  const router = useRouter()

  const [openDrawer, setOpenDrawer] = useState(false)

  const [selectedRoute, setSelectedRoute] = useState<string>('/')

  // Função personalizada para atualizar a rota selecionada e navegar
  const navigateToRoute = (route: string) => {
    setSelectedRoute(route) // Atualiza o estado
    router.push(route) // Navega para a rota usando router.push
    // setOpenDrawer(false) // fechar ao navegar
  }

  const value: MenuContextProps = {
    selectedRoute,
    navigateToRoute,
  }

  return (
    <MenuContext.Provider value={value}>
      <MenuAppBar setOpen={() => setOpenDrawer(!openDrawer)} />
      <ResponsiveDrawer open={openDrawer} />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </MenuContext.Provider>
  )
}


// Hook personalizado para usar o contexto
export const useMenu = (): MenuContextProps => {
  return useContext(MenuContext)
}
