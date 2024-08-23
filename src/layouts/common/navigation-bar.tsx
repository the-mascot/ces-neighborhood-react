// react
import { useState } from 'react';
// libraries
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { RootState } from 'src/redux/store';
// components
import { NeighborhoodLogo } from 'src/components/icon/index';
// @mui
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  PaletteMode,
  styled,
  Toolbar
} from '@mui/material';
import { Logout, Settings } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
// data
import { useNavData } from 'src/layouts/config-navigation';
// paths
import { paths } from 'src/routes/paths';
import { logout } from 'src/redux/slices/auth-slice';
import { removeToken } from 'src/utils/token-utils';

interface Props {
  mode: PaletteMode;
  toggleColorMode: () => void;
}

type MenuButtonProps = {
  active: string | undefined;
};

/*GNB 메뉴 버튼 스타일*/
const MenuButton = styled(Button)<MenuButtonProps>(({ theme, active }) => ({
  color: theme.palette.grey[800],
  fontSize: 21,
  fontWeight: active ? '600' : '500',
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

export default function NavigationBar({ mode, toggleColorMode }: Props) {
  // 메뉴 Data
  const navData = useNavData();
  // navigate
  const navigate = useNavigate();
  // location
  const location = useLocation();
  // redux
  const dispatch = useDispatch();
  const { nickname, profileImage, isAuthenticated } = useSelector((state: RootState) => state.auth);
  // states
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  /**-------------------------------- 이벤트헨들러 --------------------------------------*/
  /*프로필 클릭이벤트*/
  const handleProfileClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };

  /*프로필메뉴 닫기*/
  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  /*로그아웃 클릭이벤트*/
  const handleLogoutClick = () => {
    dispatch(logout());
    removeToken();
    window.location.href = `${window.location.origin}/`;
  };

  return (
    <AppBar position="fixed" sx={{ boxShadow: 0, bgcolor: 'transparent', backgroundImage: 'none', maxHeight: 80 }}>
      <Container maxWidth="lg">
        <Toolbar
          variant="regular"
          sx={(theme) => ({
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
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
              <NeighborhoodLogo width="140" height="72" />
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
                  {nav.title}
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
            {!isAuthenticated && (
              <Button color="secondary" variant="text" size="medium" onClick={() => navigate(paths.auth.login)}>
                로그인
              </Button>
            )}
            {isAuthenticated && (
              <>
                <IconButton
                  onClick={(e) => handleProfileClick(e)}
                  aria-controls={open ? 'profileMenu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                >
                  <Avatar alt={nickname} src={profileImage} />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  id="profileMenu"
                  open={open}
                  onClose={handleProfileMenuClose}
                  onClick={handleProfileMenuClose}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                      mt: 1.5,
                      '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1
                      },
                      '&::before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0
                      }
                    }
                  }}
                >
                  <MenuItem onClick={handleProfileMenuClose}>
                    <Avatar /> 내 정보보기
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleProfileMenuClose}>
                    <ListItemIcon>
                      <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                  </MenuItem>
                  <MenuItem onClick={handleLogoutClick}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    로그아웃
                  </MenuItem>
                </Menu>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
      <Divider />
    </AppBar>
  );
}
