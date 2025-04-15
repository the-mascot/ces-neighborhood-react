// @mui
import * as React from 'react';

import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';

import Copyright from 'src/components/copyright';
//

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function EmptyLayout({ children }: Props): JSX.Element {
  return (
    <>
      <Container component="main" maxWidth="xs">
        <Stack
          sx={{
            py: 1,
            m: 'auto',
            maxWidth: 400,
            minHeight: '100vh',
            textAlign: 'center',
            justifyContent: 'center',
          }}
        >
          {children}
        </Stack>
      </Container>
    </>
  );
}
