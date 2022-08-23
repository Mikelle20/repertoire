/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-vars */

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

function ResponsiveAppBar(): JSX.Element {
  const accessToken = window.sessionStorage.getItem('accessToken');
  const pages = [['Home', '/home'], ['Friends', '/friends'], ['Suggestion', '/suggestion'], ['Playlists', '/playlists'], ['About', '/about']];
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  interface UserInterface {
    user: {
      profile_image: string
      user_id: string
      display_name: string
    }
  }
  const [data, setData] = React.useState<UserInterface | null>(null);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  // const [anchorElNav, setAnchorElNav] = React.useState(null);

  // const handleOpenNavMenu = (event: React.SyntheticEvent) => {
  //   setAnchorElNav(event.currentTarget);
  // };

  const handleCloseNavMenu = async () => {
    setAnchorElNav(null);
  };

  const handleClick = async () => {
    await axios.delete('/authorize/logout', { withCredentials: true }).then((): void => {
      setData(null);
      // window.sessionStorage.removeItem('accessToken')
      window.sessionStorage.clear();
    }).then(() => {
      window.location.href = '/login';
    });
  };

  React.useEffect(() => {
    if (accessToken) {
      axios.get(
        '/authorize/getUser',
        { headers, withCredentials: true },
      ).then((res) => {
        setData(res.data);
      });
    }
  }, [accessToken]);

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
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Repertoire
          </Typography>

          <Box
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
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
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {!accessToken
                ? (
                  <>
                    <MenuItem>
                      <NavLink className="navLink" to="/register">Register</NavLink>
                    </MenuItem>
                    <MenuItem>
                      <NavLink className="navLink" to="/login">Login</NavLink>
                    </MenuItem>
                    <MenuItem>
                      <NavLink className="navLink" to="/about">About</NavLink>
                    </MenuItem>
                  </>
                )
                : (
                  <>
                    {pages.map((page) => (
                      <MenuItem key={page[0]} onClick={handleCloseNavMenu}>
                        <NavLink className="navLink" to={page[1]}><span>{page[0]}</span></NavLink>
                      </MenuItem>
                    ))}
                    {accessToken
                      ? (
                        <MenuItem onClick={handleCloseNavMenu}>
                          <span className="navLink" onClick={handleClick}>Logout</span>
                        </MenuItem>
                      )
                      : (
                        <MenuItem onClick={handleCloseNavMenu}>
                          <NavLink className="navLink" to="/login">Login</NavLink>
                        </MenuItem>
                      )}
                  </>
                )}
            </Menu>
          </Box>
          <img alt="logo" src={require('../assets/logos/listening-music-light.png')} className="navLogo" />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/Home"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontWeight: 900,
              fontSize: '2rem',
              letterSpacing: '.2rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Repertoire
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {!accessToken
              ? (
                <>
                  <NavLink className="navLinkFull" to="/register">Register</NavLink>
                  <NavLink className="navLinkFull" to="/login">Login</NavLink>
                  <NavLink className="navLinkFull" to="/about">About</NavLink>
                </>
              )
              : (
                <>
                  {pages.map((page) => (
                    <NavLink
                      to={page[1]}
                      className="navLinkFull"
                      key={page[0]}
                      onClick={handleCloseNavMenu}
                      // sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                      <span>{page[0]}</span>
                    </NavLink>
                  ))}
                  {accessToken ? <span className="navLinkFull" onClick={handleClick}>Logout</span> : <NavLink className="navLinkFull" to="/login"/* sx={{ my: 2, color: 'white', display: 'block' }} */>Login</NavLink>}
                </>
              )}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {data?.user && (
            <Tooltip title={data.user.user_id}>
              <Avatar alt={data.user.display_name} src={data.user.profile_image} />
            </Tooltip>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
