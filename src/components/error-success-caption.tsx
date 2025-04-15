import { JSX } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import VerifiedIcon from '@mui/icons-material/Verified';
import { Stack, Typography } from '@mui/material';

type Props = {
  error?: boolean;
  message: string;
};

export default function ErrorSuccessCaption({ error, message }: Props): JSX.Element {
  return (
    <Stack direction="row" spacing={1} alignItems="center" height="20px">
      {error || error === undefined ? <CloseIcon color="error" /> : <VerifiedIcon color="primary" />}
      <Typography variant="caption" color={error ? 'error' : 'primary'} textAlign="start">
        {message}
      </Typography>
    </Stack>
  );
}
