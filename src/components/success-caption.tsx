import { Stack, Typography } from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified';

type Props = {
  message?: string;
};

export default function SuccessCaption({ message }: Props) {
  return (
    <Stack direction="row" spacing={1} alignItems="center" height="20px">
      <VerifiedIcon color="primary" />
      <Typography variant="caption" color="primary" textAlign="start">
        {message}
      </Typography>
    </Stack>
  );
}
