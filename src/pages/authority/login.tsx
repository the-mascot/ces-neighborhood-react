// react
import * as React from 'react';
// libraries
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useMutation } from '@tanstack/react-query';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
// apis
import { login } from 'src/apis/auth';
// types
import { LoginReq } from 'src/types/auth.type';
// paths
import { paths } from 'src/routes/paths';
// components
import Copyright from 'src/components/copyright';
import { RouterLink } from 'src/routes/components';
import NaverLoginButton from 'src/components/authority/naver-login-button';
import GoogleLoginButton from 'src/components/authority/google-login-button';
// @mui
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  Typography
} from '@mui/material';

// yup schema
const schema = yup.object().shape({
  userId: yup.string().email('유효한 이메일을 입력해주세요.').required('ID를 입력해주세요.'),
  password: yup.string().required('비밀번호를 입력해주세요')
});

export default function Login() {
  // navigate
  const navigate = useNavigate();
  // useForm
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors }
  } = useForm<LoginReq>({
    resolver: yupResolver(schema)
  });

  /**-------------------------------- useMutation --------------------------------------*/
  const mutation = useMutation({
    mutationFn: login
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
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          로그인
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            label="이메일을 입력해주세요."
            {...register('userId')}
            autoFocus
            autoComplete="email"
          />
          {errors.userId && (
            <Box display="flex" justifyContent="start">
              <Typography variant="body2" color="error">
                {errors.userId.message}
              </Typography>
            </Box>
          )}
          <TextField
            margin="normal"
            fullWidth
            label="비밀번호"
            type="password"
            {...register('password')}
            autoComplete="off"
          />
          {errors.password && !errors.userId && (
            <Box display="flex" justifyContent="start">
              <Typography variant="body2" color="error">
                {errors.password.message}
              </Typography>
            </Box>
          )}
          <Box>
            <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="ID 기억하기" />
          </Box>
          <Button type="submit" fullWidth variant="contained" color="info" sx={{ mt: 3, mb: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              로 그 인
            </Typography>
          </Button>
          {/** 네이버로그인버튼 */}
          <NaverLoginButton />
          {/** 구글로그인버튼 */}
          <GoogleLoginButton />
          <Grid container>
            <Grid item xs={6} textAlign="start">
              <Link href="src/pages/authority/login#" variant="body2">
                비밀번호 찾기
              </Link>
            </Grid>
            <Grid item xs={6} textAlign="end">
              <Link component={RouterLink} href={paths.auth.join} variant="body2">
                {'회원가입'}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
