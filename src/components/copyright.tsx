import { Box, Link, SxProps, Typography } from '@mui/material';

import RouterLink from 'src/routes/components/router-link';
import { paths } from 'src/routes/paths';

export default function Copyright(props: SxProps): JSX.Element {
  return (
    <Box>
      <Typography variant="body2" color={'text.sen'} align="center" sx={{ ...props }}>
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
