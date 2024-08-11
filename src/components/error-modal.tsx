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
  message?: React.ReactNode;
};

function ErrorModal({ message }: Props) {
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(true);
  const handleOnClick = () => {
    setOpen(false);
    navigate(-1);
  };
  /**-------------------------------- components --------------------------------------*/
  /*기본메세지*/
  const DefaultMessage = () => {
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
            <Typography variant="h4" color="error" textAlign="center" mb={3}>
              ERROR
            </Typography>
          </Grid>
          <Grid item>{message ? message : <DefaultMessage />}</Grid>
        </Grid>
        <Grid container justifyContent="center">
          <Button fullWidth variant="outlined" color="error" onClick={() => handleOnClick()}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              확인
            </Typography>
          </Button>
        </Grid>
      </Box>
    </Modal>
  );
}

export default memo(ErrorModal);
