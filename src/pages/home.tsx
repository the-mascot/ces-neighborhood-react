import * as React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import LogoCollection from 'src/components/LogoCollection';
import Highlights from 'src/components/Highlights';
import Pricing from 'src/components/Pricing';
import Features from 'src/components/Features';
import Testimonials from 'src/components/Testimonials';
import FAQ from 'src/components/FAQ';
import { Typography } from '@mui/material';

export default function Home() {
  return (
    <>
      <Box sx={{ bgcolor: 'background.default' }}>
        <Typography variant="h1">세상에 이런 폰트가 나오다니 천재인듯</Typography>
        <Typography variant="h2">안녕하세요 h2 입니다.</Typography>
        <Typography variant="h3">안녕하세요 h3 입니다.</Typography>
        <Typography variant="h4">안녕하세요 h4 입니다.</Typography>
        <Typography variant="h5">안녕하세요 h5 입니다.</Typography>
        <Typography variant="h6">안녕하세요 h6 입니다.</Typography>
        <Typography variant="subtitle1">안녕하세요 subtitle1 입니다.</Typography>
        <Typography variant="subtitle2">안녕하세요 subtitle2 입니다.</Typography>
        <Typography variant="button">안녕하세요 button 입니다.</Typography>
        <Typography variant="body1">안녕하세요 body1 입니다.</Typography>
        <Typography variant="body2">안녕하세요 body2 입니다.</Typography>
        <Typography variant="caption">안녕하세요 caption 입니다.</Typography>
        <LogoCollection />
        <Features />
        <Divider />
        <Testimonials />
        <Divider />
        <Highlights />
        <Divider />
        <Pricing />
        <Divider />
        <FAQ />
        <Divider />
      </Box>
    </>
  );
}
