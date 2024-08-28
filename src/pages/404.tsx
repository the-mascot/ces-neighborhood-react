import { m } from 'framer-motion';
// @mui
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// components
import { MotionContainer, varBounce } from 'src/components/animate';
// assets
import { PageNotFoundIllustration } from 'src/assets/illustrations';
import { useNavigate } from 'react-router-dom';

// ----------------------------------------------------------------------

export default function Page404() {
  // navigate
  const navigate = useNavigate();
  const handleGoHomeClick = () => {
    navigate('/', { replace: true });
  };

  return (
    <MotionContainer>
      <m.div variants={varBounce().in}>
        <Typography variant="h3" paragraph>
          Sorry, Page Not Found!
        </Typography>
      </m.div>

      <m.div variants={varBounce().in}>
        <Typography sx={{ color: 'text.secondary' }}>
          Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL? Be sure to check your
          spelling.
        </Typography>
      </m.div>

      <m.div variants={varBounce().in}>
        <PageNotFoundIllustration />
      </m.div>

      <Button onClick={() => handleGoHomeClick()} size="large" variant="contained">
        Go to Home
      </Button>
    </MotionContainer>
  );
}
