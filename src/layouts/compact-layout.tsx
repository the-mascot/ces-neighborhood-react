// @mui
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Copyright from 'src/components/copyright';
import * as React from 'react';
//

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function CompactLayout({ children }: Props) {
  return (
    <Container component="body">
      <Container component="main" maxWidth="xs">
        <Stack
          sx={{
            py: 1,
            m: 'auto',
            maxWidth: 400,
            minHeight: '100vh',
            textAlign: 'center',
            justifyContent: 'center'
          }}
        >
          {children}
        </Stack>
        <Copyright sx={{ mt: 5, mb: 5 }} />
      </Container>
    </Container>
  );
}
