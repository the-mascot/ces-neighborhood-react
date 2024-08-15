// react
import * as React from 'react';
import { useState } from 'react';
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
import { RouterLink } from 'src/routes/components';
import { ReactComponent as GoogleLogo } from 'src/assets/images/google_logo.svg';
import { ReactComponent as NaverLogo } from 'src/assets/images/naver_logo.svg';
import { ReactComponent as NeighborhoodLogo } from 'src/assets/images/neighborhood_logo.svg';
import ShowPasswordIcon from 'src/components/authority/show-password-icon';
// @mui
import { Box, Button, Checkbox, FormControlLabel, InputLabel, Link, Stack, TextField, Typography } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import endpoints from 'src/apis/endpoints';

const GoogleLoginButton = styled(Button)(({ theme }) => ({
  color: theme.palette.grey[900],
  outline: `1px soild ${theme.palette.grey[300]}`,
  borderColor: theme.palette.grey[800],
  mb: 1,
  '&:hover': {
    backgroundColor: alpha('#FFF', 0.3),
    borderColor: theme.palette.grey[900],
    boxShadow: `0 0 0 1px  ${alpha(theme.palette.grey[900], 0.5)}`
  }
}));

// yup schema
const schema = yup.object().shape({
  userId: yup.string().email('유효한 이메일을 입력해주세요.').required('ID를 입력해주세요.'),
  password: yup.string().required('비밀번호를 입력해주세요')
});

export default function Login() {
  // navigate
  const navigate = useNavigate();
  // states
  const [showPassword, setShowPassword] = useState<boolean>(false);
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

  /**-------------------------------- 이벤트헨들러 --------------------------------------*/
  /*네이버로 시작하기*/
  const naverLoginClick = () => {
    const redirectURI = encodeURIComponent(process.env.REACT_APP_OAUTH_NAVER_REDIRECT_URL as string);
    const clientId = process.env.REACT_APP_OAUTH_NAVER_CLIENT_ID;
    const url = `${endpoints.oAuth.naver}?client_id=${clientId}&response_type=code&redirect_uri=${redirectURI}&state=${generateState()}`;
    console.log('url : ', url);
    window.location.href = url;
  };

  /*구글로 시작하기*/
  const googleLoginClick = () => {
    const redirectURI = encodeURIComponent(process.env.REACT_APP_OAUTH_GOOGLE_REDIRECT_URL as string);
    const scope = encodeURIComponent(process.env.REACT_APP_OAUTH_GOOGLE_SCOPE as string);
    const clientId = process.env.REACT_APP_OAUTH_GOOGLE_CLIENT_ID;
    const url = `${endpoints.oAuth.google}?client_id=${clientId}&response_type=code&redirect_uri=${redirectURI}&state=${generateState()}&scope=${scope}`;
    console.log('url : ', url);
    window.location.href = url;
  };

  /**-------------------------------- function --------------------------------------*/
  // 난수 생성기를 사용하여 state 값 생성
  function generateState() {
    const array = new Uint8Array(16); // 16바이트 = 128비트
    window.crypto.getRandomValues(array);

    // 16진수 문자열로 변환하여 반환
    return Array.from(array, (byte) => `0${byte.toString(16)}`.slice(-2)).join('');
  }

  return (
    <Stack justifyContent="center" alignItems="center">
      <NeighborhoodLogo width="180" height="auto" />
      <Typography variant="h3" sx={{ mt: 2 }}>
        로그인
      </Typography>
      <Box width="100%" component="form" onSubmit={handleSubmit(onSubmit)} mt={5}>
        <Box>
          <InputLabel htmlFor="email">이메일</InputLabel>
          <TextField
            id="email"
            fullWidth
            placeholder="이메일을 입력해주세요."
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
        </Box>
        <Box mt={2}>
          <InputLabel htmlFor="password">비밀번호</InputLabel>
          <TextField
            id="password"
            fullWidth
            placeholder="비밀번호"
            type={showPassword ? 'text' : 'password'}
            {...register('password')}
            autoComplete="off"
            InputProps={{
              endAdornment: <ShowPasswordIcon showPassword={showPassword} setShowPassword={setShowPassword} />
            }}
          />
          {errors.password && !errors.userId && (
            <Box display="flex" justifyContent="start">
              <Typography variant="body2" color="error">
                {errors.password.message}
              </Typography>
            </Box>
          )}
        </Box>
        <Stack alignItems="start" mt={1}>
          <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="ID 기억하기" />
        </Stack>
        <Button type="submit" fullWidth variant="contained" color="secondary" sx={{ mt: 3, mb: 1 }}>
          <Typography variant="subtitle2">로 그 인</Typography>
        </Button>
        {/** 네이버로그인버튼 */}
        <Button fullWidth variant="contained" color="success" sx={{ mb: 1 }} onClick={naverLoginClick}>
          <Stack direction="row" justifyContent="start" alignItems="center">
            <NaverLogo width="40" height="40" />
            <Typography variant="subtitle2">네이버로 시작하기</Typography>
          </Stack>
        </Button>
        {/** 구글로그인버튼 */}
        <GoogleLoginButton fullWidth variant="outlined" onClick={googleLoginClick}>
          <Stack direction="row" justifyContent="start" alignItems="center">
            <GoogleLogo width="40" height="40" />
            <Typography variant="subtitle2">구글로 시작하기</Typography>
          </Stack>
        </GoogleLoginButton>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mt={1}>
          <Link href="src/pages/authority/login#" color="grey[900]" variant="body2">
            비밀번호 찾기
          </Link>
          <Link component={RouterLink} href={paths.auth.join} color="grey[900]" variant="body2">
            {'회원가입'}
          </Link>
        </Stack>
      </Box>
    </Stack>
  );
}
