
import { Button } from '@mui/material'
import { useMenu } from '../config/context/MenuContext'
import { useRouter } from 'next/navigation'

function Menu() {
  const { selectedRoute,  navigateToRoute} = useMenu()
  const router = useRouter()

  const handleRouteChange = (route: string) => {
    navigateToRoute(route)
    router.push(route)
  }

  return (
    <nav>
      <Button
        onClick={() => navigateToRoute('/')}
        variant={selectedRoute === '/' ? 'contained' : 'outlined'}
      >
        Home
      </Button>
      <Button
        onClick={() => navigateToRoute('/about')}
        variant={selectedRoute === '/about' ? 'contained' : 'outlined'}
      >
        About
      </Button>
      <Button
        onClick={() => navigateToRoute('/contact')}
        variant={selectedRoute === '/contact' ? 'contained' : 'outlined'}
      >
        Contact
      </Button>
    </nav>
  )
}

export default Menu
