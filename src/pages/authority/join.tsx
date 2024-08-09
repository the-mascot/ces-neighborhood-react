import { Box, Button, Container, Grid, Stack, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { JoinReq, LoginReq } from 'src/types/auth.type';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { join } from 'src/apis/auth';
import * as yup from 'yup';
import Copyright from 'src/components/copyright';
import * as React from 'react';
import { useCallback, useState } from 'react';
import debounce from 'lodash.debounce';
import { checkIdDuplicate } from 'src/apis/member';
import OneButtonModal from 'src/components/one-button-modal';
import VerifiedIcon from '@mui/icons-material/Verified';

// yup schema
const schema = yup.object().shape({
  userId: yup.string().email('유효한 이메일을 입력해주세요.').required('ID를 입력해주세요.'),
  password: yup.string().required('비밀번호를 입력해주세요')
});

export default function Join() {
  // navigate
  const navigate = useNavigate();
  // states
  const [isDuplicate, setIsDuplicate] = useState<boolean | null>(null);
  const [openError, setOpenError] = useState<boolean>(false);
  // useForm
  const {
    register,
    handleSubmit,
    trigger,
    clearErrors,
    setError,
    formState: { errors }
  } = useForm<JoinReq>({
    resolver: yupResolver(schema)
  });

  /**-------------------------------- useMutation --------------------------------------*/
  const mutation = useMutation({
    mutationFn: join
  });

  /**-------------------------------- onSubmit --------------------------------------*/
  /*회원가입 onsubmit*/
  const onSubmit = async (data: LoginReq) => {
    mutation.mutate(data, {
      onSuccess: () => {
        navigate('/', { replace: true });
      }
    });
  };

  /**-------------------------------- apis --------------------------------------*/
  /*ID 중복체크(debounce) */
  const callCheckIdDuplicate = useCallback(async (userId: string) => {
    try {
      const response = await checkIdDuplicate(userId);
      if (response.code === '0000') {
        setIsDuplicate(response.data);
      }
    } catch (e) {
      console.error('=====[debouncedCheckIdDuplicate]===== error :', e);
      setOpenError(true);
    }
  }, []);

  /**-------------------------------- 이벤트헨들러 --------------------------------------*/
  /*ID 값 변경 이벤트헨들러*/
  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newId = e.target.value;
    const isEmailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newId);
    console.log('newId : ', newId);
    console.log('isEmailFormat : ', isEmailFormat);

    if (newId === '') {
      // 입력 clear 시
      clearErrors('userId');
      setIsDuplicate(null);

      return;
    } else if (!isEmailFormat) {
      // 이메일 포멧 아니면
      setIsDuplicate(null);
      setError('userId', { type: 'manual', message: '유효한 이메일을 입력해주세요.' });

      return;
    } else {
      clearErrors('userId');
    }

    // ID 중복검사 호출
    callCheckIdDuplicate(newId);
  };

  const debouncedHandleIdChange = debounce(handleIdChange, 500);

  /**-------------------------------- components --------------------------------------*/
  /*ID 중복체크 에러메세지*/
  const checkIdError = () => {
    return (
      <>
        <Typography variant="subtitle1">ID 중복검사중 에러발생.</Typography>
        <Typography variant="subtitle1">잠시후에 다시 시도해주세요.</Typography>
      </>
    );
  };

  /*에러모달 확인 이벤트헨들러*/
  const handleModalClose = useCallback(() => {
    setOpenError(false);
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <OneButtonModal title="ERROR" message={checkIdError()} open={openError} onClick={handleModalClose} />
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
            onChange={(e) => debouncedHandleIdChange(e)}
          />
          {isDuplicate === true && (
            <Typography variant="body2" color="error" textAlign="start">
              이미 가입된 이메일입니다.
            </Typography>
          )}
          {isDuplicate === false && !errors.userId && (
            <Stack direction="row" spacing={1}>
              <VerifiedIcon color="primary" />
              <Typography variant="body2" color="success" textAlign="start">
                사용 가능한 아이디입니다.
              </Typography>
            </Stack>
          )}
          {errors.userId && (
            <Typography variant="body2" color="error" textAlign="start">
              {errors.userId.message}
            </Typography>
          )}
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
