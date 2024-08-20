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

export default function EmptyLayout({ children }: Props) {
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
            justifyContent: 'center'
          }}
        >
          {children}
        </Stack>
      </Container>
    </>
  );
}
