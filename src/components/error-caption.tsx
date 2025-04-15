import CloseIcon from '@mui/icons-material/Close';
import { Stack, Typography } from '@mui/material';

type Props = {
  message?: string;
};

export default function ErrorCaption({ message }: Props): JSX.Element {
  return (
    <Stack direction="row" spacing={1} alignItems="center" height="20px">
      <CloseIcon color="error" />
      <Typography variant="caption" color="error" textAlign="start">
        {message}
      </Typography>
    </Stack>
  );
}
