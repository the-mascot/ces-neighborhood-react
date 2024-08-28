import { m } from 'framer-motion';
// @mui
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// assets
import { ForbiddenIllustration } from 'src/assets/illustrations';
import { MotionContainer, varBounce } from 'src/components/animate';
import { useNavigate } from 'react-router-dom';

// ----------------------------------------------------------------------

export default function Page403() {
  // navigate
  const navigate = useNavigate();
  const handleGoHomeClick = () => {
    navigate('/', { replace: true });
  };

  return (
    <MotionContainer>
      <m.div variants={varBounce().in}>
        <Typography variant="h3" paragraph>
          No permission
        </Typography>
      </m.div>

      <m.div variants={varBounce().in}>
        <Typography sx={{ color: 'text.secondary' }}>
          The page you&apos;re trying access has restricted access.
          <br />
          Please refer to your system administrator
        </Typography>
      </m.div>

      <m.div variants={varBounce().in}>
        <ForbiddenIllustration />
      </m.div>

      <Button onClick={handleGoHomeClick} size="large" variant="contained">
        Go to Home
      </Button>
    </MotionContainer>
  );
}
