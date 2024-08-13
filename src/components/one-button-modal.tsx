import { Box, Button, Grid, Modal, Typography } from '@mui/material';
import { memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '0px',
  boxShadow: 24,
  p: 4
};

type Props = {
  title: string;
  message?: React.ReactNode;
  buttonMessage?: string;
  open: boolean;
  onClick: () => void;
};

function OneButtonModal({ title, message, buttonMessage, open, onClick }: Props) {
  const DefaultErrorMessage = () => {
    return (
      <>
        <Typography variant="subtitle1">에러가 발생했습니다.</Typography>
        <Typography variant="subtitle1">잠시후에 다시 시도해주십시오.</Typography>
      </>
    );
  };

  return (
    <Modal open={open}>
      <Box sx={style}>
        <Grid container spacing={2} mb={3}>
          <Grid container item justifyContent="center">
            <Typography variant="h4" color="grey[800]">
              {title}
            </Typography>
          </Grid>
          <Grid item>{message ? message : <DefaultErrorMessage />}</Grid>
        </Grid>
        <Grid container justifyContent="center">
          <Button fullWidth variant="contained" color="secondary" onClick={onClick}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              {buttonMessage ? buttonMessage : '확인'}
            </Typography>
          </Button>
        </Grid>
      </Box>
    </Modal>
  );
}

export default memo(OneButtonModal);
