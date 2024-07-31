import * as React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import LogoCollection from 'src/components/LogoCollection';
import Highlights from 'src/components/Highlights';
import Pricing from 'src/components/Pricing';
import Features from 'src/components/Features';
import Testimonials from 'src/components/Testimonials';
import FAQ from 'src/components/FAQ';
import Hero from 'src/components/Hero';

export default function Index() {
  return (
    <>
      <Box sx={{ bgcolor: 'background.default' }}>
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
