import { IconButton, InputAdornment } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

type Props = {
  onClick: () => void;
};

export default function ButtonClearIcon({ onClick }: Props) {
  return (
    <InputAdornment position="end" sx={{ pr: 1 }}>
      <IconButton aria-label="초기화" edge="end" onClick={onClick}>
        <CancelIcon />
      </IconButton>
    </InputAdornment>
  );
}
