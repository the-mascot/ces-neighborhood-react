import { Box, Link, Typography } from '@mui/material';
import * as React from 'react';
import { paths } from 'src/routes/paths';
import RouterLink from 'src/routes/components/router-link';

export default function Copyright(props: any) {
  return (
    <Box>
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link component={RouterLink} href={paths.home} color="inherit">
          이웃사람들
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </Box>
  );
}
