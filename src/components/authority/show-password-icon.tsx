import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import * as React from 'react';

type Props = {
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ShowPasswordIcon({ showPassword, setShowPassword }: Props) {
  return (
    <InputAdornment position="end" sx={{ pr: 1 }}>
      <IconButton aria-label="비밀번호 보기" onClick={() => setShowPassword(!showPassword)} edge="end">
        {showPassword ? <Visibility /> : <VisibilityOff />}
      </IconButton>
    </InputAdornment>
  );
}
