/* eslint-disable import/no-absolute-path */

import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import { NavLink } from 'react-router-dom'
import logo from '/Users/ambarreinoso/Desktop/projects/repertoire/client/src/assets/logos/listening-music-light.png'
import axios from 'axios'

const ResponsiveAppBar = () => {
  const accessToken = window.sessionStorage.getItem('accessToken') || null
  const user = JSON.parse(window.sessionStorage.getItem('user') || window.localStorage.getItem('user')) || null
  const pages = [['Home', '/home'], ['Friends', '/friends'], ['Suggestion', '/suggestion'], ['Playlists', '/playlists']]

  const [anchorElNav, setAnchorElNav] = React.useState(null)

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = async (id) => {
    setAnchorElNav(null)
  }

  const handleClick = async (id) => {
    if (id === 'logout') {
      window.sessionStorage.clear()
      await axios.get('http://localhost:5000/authorize/logout', { withCredentials: true })
    }
  }

  return (
    <AppBar position="static" style={{ backgroundColor: '#2A3564', color: '#c3cbeb' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/Home"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              //   fontFamily: 'monospace',
              //   fontWeight: 700,
              //   letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none'
            }}
          >
            Repertoire
          </Typography>

          <Box
          sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' }
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page[0]} onClick={handleCloseNavMenu}>
                  {/* <Typography textAlign="center">{page}</Typography> */}
                  <NavLink className='navLink' to={page[1]}>{page[0]}</NavLink>
                </MenuItem>
              ))}
              <MenuItem onClick={handleCloseNavMenu}>
                <NavLink className='navLink' to='/login' onClick={handleClick(accessToken ? 'logout' : 'login')}>{accessToken ? 'Logout' : 'Login'}</NavLink>
              </MenuItem>
            </Menu>
          </Box>
          <img src={logo} className='navLogo'></img>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/Home"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              //   fontFamily: 'monospace',
              fontWeight: 900,
              fontSize: '2rem',
              letterSpacing: '.2rem',
              color: 'inherit',
              textDecoration: 'none'
            }}
          >
            Repertoire
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <NavLink
                to={page[1]}
                className='navLinkFull'
                key={page[0]}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page[0]}
              </NavLink>
            ))}
                <NavLink
                className='navLinkFull'
                to='/login'
                sx={{ my: 2, color: 'white', display: 'block' }}
                onClick={handleClick(accessToken ? 'logout' : 'login')}>
                  {accessToken ? 'Logout' : 'Login'}
                </NavLink>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title={user.user_id}>
                <Avatar alt={user.display_name} src={user.profile_image} />
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default ResponsiveAppBar

// /* eslint-disable import/no-absolute-path */
// import React from 'react'
// import { Link, NavLink } from 'react-router-dom'
// import logo from '/Users/ambarreinoso/Desktop/projects/repertoire/client/src/assets/logos/listening-music-light.png'

// function Navbar () {
//   const user = window.localStorage.getItem('user') || window.sessionStorage.getItem('user') || null
//   return (
//     <>
//     <nav className='navbar'>
//         <Link to='/home' className='navbarBrand'>
//             <img src={logo} className='navLogo'></img>
//             Repertoire
//         </Link>
//         <div className='linkContainer'>
//             <NavLink to='/home'className='navLink'>
//                 Home
//             </NavLink>
//             <NavLink to='/friends'className='navLink'>
//                 Friends
//             </NavLink>
//             <NavLink to='/suggestion'className='navLink'>
//                 Suggestion
//             </NavLink>
//             <NavLink to='/playlists'className='navLink'>
//                 Playlists
//             </NavLink>
//             { user
//               ? <NavLink to='/login'className='navLink'>
//                 Logout
//             </NavLink>
//               : <NavLink to='/login'className='navLink'>
//                 Login
//             </NavLink>}
//         </div>
//     </nav>
//     </>
//   )
// }

// export default Navbar
