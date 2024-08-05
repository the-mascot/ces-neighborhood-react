import React from 'react';
import { CircularProgress, Backdrop } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledBackdrop = styled(Backdrop)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  color: '#fff',
  backgroundColor: 'rgba(0, 0, 0, 0.5)' // 어두운 배경색에 반투명도 적용
}));

export default function LoadingSpinner() {
  return (
    <StyledBackdrop open={true}>
      <CircularProgress color="inherit" />
    </StyledBackdrop>
  );
}
