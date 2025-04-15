// @mui
import { JSX } from 'react';

import { Container } from '@mui/material';
import Button from '@mui/material/Button';

// assets
import { useNavigate } from 'react-router-dom';

// ----------------------------------------------------------------------

export default function Page403(): JSX.Element {
  // navigate
  const navigate = useNavigate();
  const handleGoHomeClick = (): void => {
    navigate('/', { replace: true });
  };

  return (
    <Container>
      <Button onClick={handleGoHomeClick} size="large" variant="contained">
        Go to Home
      </Button>
    </Container>
  );
}
