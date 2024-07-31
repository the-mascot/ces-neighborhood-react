import { Container } from '@mui/material';

type Props = {
  children: React.ReactNode;
};

export default function Main({ children }: Props) {
  return (
    <Container
      maxWidth="lg"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pt: { xs: 14, sm: 20 },
        pb: { xs: 8, sm: 12 }
      }}
    >
      {children}
    </Container>
  );
}
