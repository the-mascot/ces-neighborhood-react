import { Button, Grid, Typography } from '@mui/material';
import { ReactComponent as NaverLogo } from 'src/assets/images/naver_logo.svg';
import * as React from 'react';

export default function NaverLoginButton() {
  return (
    <Button fullWidth variant="contained" color="success" sx={{ mb: 1 }}>
      <Grid container justifyContent="start" alignItems="center" pl={5}>
        <NaverLogo width="48" height="48" />
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          네이버로 시작하기
        </Typography>
      </Grid>
    </Button>
  );
}
