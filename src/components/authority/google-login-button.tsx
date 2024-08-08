import { Button, Grid, Typography } from '@mui/material';
import { ReactComponent as GoogleLogo } from 'src/assets/images/google_logo.svg';
import * as React from 'react';

export default function GoogleLoginButton() {
  return (
    <Button fullWidth variant="outlined" color="secondary" sx={{ mb: 1 }}>
      <Grid container justifyContent="start" alignItems="center" pl={5}>
        <GoogleLogo width="48" height="48" />
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          구글로 시작하기
        </Typography>
      </Grid>
    </Button>
  );
}
