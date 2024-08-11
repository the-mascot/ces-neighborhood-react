import { Stack, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import VerifiedIcon from '@mui/icons-material/Verified';

type Props = {
  error?: boolean;
  message: string;
};

export default function ErrorSuccessCaption({ error, message }: Props) {
  return (
    <Stack direction="row" spacing={1} alignItems="center" height="20px">
      {error || error === undefined ? <CloseIcon color="error" /> : <VerifiedIcon color="primary" />}
      <Typography variant="caption" color={error ? 'error' : 'primary'} textAlign="start">
        {message}
      </Typography>
    </Stack>
  );
}
