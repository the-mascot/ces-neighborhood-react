import * as React from 'react';
import { Avatar, Divider, IconButton, ListItemIcon, Menu, MenuItem, PaletteMode } from '@mui/material';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { ReactComponent as NeighborhoodLogo } from 'src/assets/images/neighborhood_logo.svg';
import { useNavData } from 'src/layouts/config-navigation';
import { useLocation, useNavigate } from 'react-router';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/material/styles';
import { paths } from 'src/routes/paths';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { Logout, Settings } from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import { fetchProfileInfo } from 'src/apis/member';
import { setProfileInfo } from 'src/redux/slices/member-slice';

interface Props {
  mode: PaletteMode;
  toggleColorMode: () => void;
}

type MenuButtonProps = {
  active: string | undefined;
};

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

export default function Navigator({ mode, toggleColorMode }: Props) {
  const navData = useNavData();
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useSelector((state: RootState) => state.authInfo.isAuthenticated);
  const { nickname, profileImage } = useSelector((state: RootState) => state.memberInfo);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  console.log('nickname: ', nickname);
  console.log('profileImage: ', profileImage);
  console.log('isAuthenticated: ', isAuthenticated);

  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: [isAuthenticated],
    queryFn: fetchProfileInfo
  });

  /**-------------------------------- 이벤트 헨들러 --------------------------------------*/
  const handleProfileClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  if (isSuccess) {
    dispatch(setProfileInfo({ nickname: data.data.nickname, profileImage: data.data.profileImage }));
  }

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
              <IconButton
                onClick={(e) => handleProfileClick(e)}
                aria-controls={open ? 'profileMenu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
                <Avatar alt={nickname} src={profileImage} />
              </IconButton>
            )}
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
              <MenuItem onClick={handleProfileMenuClose}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                로그아웃
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
      <Divider />
    </AppBar>
  );
}
