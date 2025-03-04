import * as React from 'react'
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material'
import { useMenu } from '@/lib/config/context/MenuContext'
import { CategoryOutlined, Home } from '@mui/icons-material'

const drawerWidth = 240


interface ResponsiveDrawerProps {
  open: boolean
}



export default function ResponsiveDrawer({ open }: ResponsiveDrawerProps) {

  const { selectedRoute, navigateToRoute } = useMenu()

  return (

    <Drawer

      variant={open ? 'persistent' : 'temporary'}
      open={open}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />

      <Box sx={{ overflow: 'auto' }}>
        <List>
          <ListItem key={'Home'}
            disablePadding sx={{ display: 'block' }}
          >
            <ListItemButton
              selected={selectedRoute === '/'}
              onClick={() => navigateToRoute('/')}
              sx={[
                {
                  minHeight: 48,
                  px: 2.5,
                },
                open
                  ? {
                    justifyContent: 'initial',
                  }
                  : {
                    justifyContent: 'center',
                  },
              ]}
            >
              <ListItemIcon
                sx={[
                  {
                    minWidth: 0,
                    justifyContent: 'center',
                  },
                  open
                    ? {
                      mr: 3,
                    }
                    : {
                      mr: 'auto',
                    },
                ]}
              >
                <Home />
              </ListItemIcon>
              <ListItemText
                primary={'Home'}
                sx={[
                  open
                    ? {
                      opacity: 1,
                    }
                    : {
                      opacity: 0,
                    },
                ]}
              />
            </ListItemButton>
          </ListItem>

          <ListItem key={'Categorias'} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              selected={selectedRoute === '/categorias/listar'}
              onClick={() => navigateToRoute('/categorias/listar')}
              sx={[
                {
                  minHeight: 48,
                  px: 2.5,
                },
                open
                  ? {
                    justifyContent: 'initial',
                  }
                  : {
                    justifyContent: 'center',
                  },
              ]}
            >
              <ListItemIcon
                sx={[
                  {
                    minWidth: 0,
                    justifyContent: 'center',
                  },
                  open
                    ? {
                      mr: 3,
                    }
                    : {
                      mr: 'auto',
                    },
                ]}
              >
                <CategoryOutlined />
              </ListItemIcon>
              <ListItemText
                primary={'Categorias'}
                sx={[
                  open
                    ? {
                      opacity: 1,
                    }
                    : {
                      opacity: 0,
                    },
                ]}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>

  )
}
