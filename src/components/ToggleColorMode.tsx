import * as React from 'react';

import ModeNightRoundedIcon from '@mui/icons-material/ModeNightRounded';
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';
import { PaletteMode } from '@mui/material';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';

interface ToggleColorModeProps extends IconButtonProps {
  mode: PaletteMode;
  toggleColorMode: () => void;
}

export default function ToggleColorMode({ mode, toggleColorMode, ...props }: ToggleColorModeProps): JSX.Element {
  return (
    <IconButton onClick={toggleColorMode} color="primary" aria-label="Theme toggle button" size="small" {...props}>
      {mode === 'dark' ? <WbSunnyRoundedIcon fontSize="small" /> : <ModeNightRoundedIcon fontSize="small" />}
    </IconButton>
  );
}
