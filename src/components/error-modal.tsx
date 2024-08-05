import { Box, Button, Modal, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};

export default function ErrorModal() {
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(true);
  const handleOnClick = () => {
    setOpen(false);
    navigate(-1);
  };

  return (
    <Modal open={open}>
      <Box sx={style}>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          에러가 발생했습니다.
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          잠시후에 다시 시도해주십시오.
        </Typography>
        <Button variant="outlined" color="success" onClick={() => handleOnClick()}>
          확인
        </Button>
      </Box>
    </Modal>
  );
}
