// components/Menu.tsx
import { useRouter } from 'next/router'
import { Button } from '@mui/material'
import { useMenu } from '../context/MenuContext'

function Menu() {
  const { selectedRoute, setSelectedRoute } = useMenu()
  const router = useRouter()

  const handleRouteChange = (route: string) => {
    setSelectedRoute(route)
    router.push(route)
  }

  return (
    <nav>
      <Button
        onClick={() => handleRouteChange('/')}
        variant={selectedRoute === '/' ? 'contained' : 'outlined'}
      >
        Home
      </Button>
      <Button
        onClick={() => handleRouteChange('/about')}
        variant={selectedRoute === '/about' ? 'contained' : 'outlined'}
      >
        About
      </Button>
      <Button
        onClick={() => handleRouteChange('/contact')}
        variant={selectedRoute === '/contact' ? 'contained' : 'outlined'}
      >
        Contact
      </Button>
    </nav>
  )
}

export default Menu
