import * as React from 'react';
import { Divider, IconButton, PaletteMode, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import ToggleColorMode from '../components/ToggleColorMode';
import { ReactComponent as NeighborhoodLogo } from 'src/assets/images/neighborhood_logo.svg';
import { useNavData } from 'src/layouts/config-navigation';
import { useLocation, useNavigate } from 'react-router';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/material/styles';
import { paths } from 'src/routes/paths';

interface Props {
  mode: PaletteMode;
  toggleColorMode: () => void;
}

type MenuButtonProps = {
  active: string | undefined;
};

const MenuButton = styled(Button)<MenuButtonProps>(({ theme, active }) => ({
  color: theme.palette.grey[800],
  variant: 'text',
  size: 'large',
  borderRadius: '0',
  borderBottom: active ? '3px solid #ff3f3f94' : 'none',
  '&:hover': {
    backgroundColor: theme.palette.grey[100]
  },
  ...theme.applyStyles('dark', {
    color: '#fff',
    borderBottom: active ? '3px solid #fff' : 'none'
  })
}));

export default function Navigator({ mode, toggleColorMode }: Props) {
  const navData = useNavData();
  const navigate = useNavigate();
  const location = useLocation();
  /**-------------------------------- 이벤트 헨들러 --------------------------------------*/

  return (
    <AppBar position="fixed" sx={{ boxShadow: 0, bgcolor: 'transparent', backgroundImage: 'none' }}>
      <Container maxWidth="lg">
        <Toolbar
          variant="regular"
          sx={(theme) => ({
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0,
            backdropFilter: 'blur(24px)',
            maxHeight: 80,
            bgcolor: 'hsla(220, 60%, 99%, 0.6)',
            ...theme.applyStyles('dark', {
              bgcolor: 'hsla(220, 0%, 0%, 0.7)'
            })
          })}
        >
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <NeighborhoodLogo width="140" />
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton>
                <MenuIcon />
              </IconButton>
            </Box>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              {navData.map((nav) => (
                <MenuButton
                  key={nav.title}
                  onClick={() => navigate(nav.path)}
                  active={location.pathname === nav.path ? 'true' : undefined}
                >
                  <Typography variant="h5">{nav.title}</Typography>
                </MenuButton>
              ))}
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 0.5,
              alignItems: 'center'
            }}
          >
            <ToggleColorMode data-screenshot="toggle-mode" mode={mode} toggleColorMode={toggleColorMode} />
            <Button color="primary" variant="text" size="small" onClick={() => navigate(paths.auth.login)}>
              로그인
            </Button>
            <Button color="primary" variant="contained" size="small">
              Sign up
            </Button>
          </Box>
        </Toolbar>
      </Container>
      <Divider />
    </AppBar>
  );
}
