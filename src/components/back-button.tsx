import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export default function BackButton() {
  return (
    <IconButton aria-label="뒤로가기" color={'secondary'}>
      <ArrowBackIosNewIcon />
    </IconButton>
  );
}
