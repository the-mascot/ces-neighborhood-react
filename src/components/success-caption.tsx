import VerifiedIcon from '@mui/icons-material/Verified';
import { Stack, Typography } from '@mui/material';

type Props = {
  message?: string;
};

export default function SuccessCaption({ message }: Props): JSX.Element {
  return (
    <Stack direction="row" spacing={1} alignItems="center" height="20px">
      <VerifiedIcon color="primary" />
      <Typography variant="caption" color="primary" textAlign="start">
        {message}
      </Typography>
    </Stack>
  );
}
