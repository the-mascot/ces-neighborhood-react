import { Avatar, Box, Button, Container, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { JoinReq, LoginReq } from 'src/types/auth.type';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery } from '@tanstack/react-query';
import { join, login } from 'src/apis/auth';
import * as yup from 'yup';
import Copyright from 'src/components/copyright';
import * as React from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useState } from 'react';
import { verifyIdDuplicate } from 'src/apis/member';
import { verifyIdDuplicateRep } from 'src/types/member.type';

// yup schema
const schema = yup.object().shape({
  userId: yup.string().email('유효한 이메일을 입력해주세요.').required('ID를 입력해주세요.'),
  password: yup.string().required('비밀번호를 입력해주세요')
});

export default function Join() {
  // navigate
  const navigate = useNavigate();
  // states
  const [userId, setUserId] = useState<string>('');
  const [isDuplicate, setIsDuplicate] = useState<boolean>(true);
  // useForm
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors }
  } = useForm<JoinReq>({
    resolver: yupResolver(schema)
  });


  /**-------------------------------- useMutation --------------------------------------*/
  const mutation = useMutation({
    mutationFn: join
  });

  /**-------------------------------- onSubmit --------------------------------------*/
  const onSubmit = async (data: LoginReq) => {
    mutation.mutate(data, {
      onSuccess: () => {
        navigate('/', { replace: true });
      }
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            label="이메일을 입력해주세요."
            autoFocus
            fullWidth
            {...register('userId')}
            autoComplete="off"
          />
          <Button type="submit" fullWidth variant="contained" color="info" sx={{ mt: 3, mb: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              로 그 인
            </Typography>
          </Button>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
