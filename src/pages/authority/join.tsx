// react
import { useCallback, useEffect, useRef, useState } from 'react';
// libraries
import * as yup from 'yup';
import { debounce } from 'lodash';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
// apis
import { join } from 'src/apis/auth';
import { checkIdDuplicate } from 'src/apis/member';
// types
import { JoinReq, LoginReq } from 'src/types/auth.type';
// components
import OneButtonModal from 'src/components/one-button-modal';
// @mui
import { Box, Button, InputLabel, Stack, TextField, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { ReactComponent as NeighborhoodLogo } from 'src/assets/images/neighborhood_logo.svg';
import ShowPasswordIcon from 'src/components/authority/ShowPasswordIcon';
import ErrorCaption from 'src/components/error-caption';
import ErrorSuccessCaption from 'src/components/error-success-caption';
import SuccessCaption from 'src/components/success-caption';
import BackButton from 'src/components/back-button';

// yup schema
const schema = yup.object().shape({
  userId: yup.string().email('유효한 이메일을 입력해주세요.').required('ID를 입력해주세요.'),
  password: yup
    .string()
    .matches(/[a-z]/, '소문자 하나 이상 포함해주세요.')
    .matches(/[0-9]/, '숫자를 하나 이상 포함해주세요.')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, '특수 문자를 하나 이상 포함해주세요.')
    .min(8, '비밀번호는 8자리 이상으로 설정해주세요.')
    .max(64, '비밀번호는 64자리 이하로 설정해주세요')
    .required('비밀번호를 입력해주세요')
});

export default function Join() {
  // navigate
  const navigate = useNavigate();
  // states
  const [step, setStep] = useState<number>(0);
  const [isDuplicate, setIsDuplicate] = useState<boolean | null>(null);
  const [openError, setOpenError] = useState<boolean>(false);
  const [disableIdNext, setDisableIdNext] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  // 비밀번호 Validation
  const [errorLowerCase, setErrorLowerCase] = useState(true);
  const [errorNumber, setErrorNumber] = useState(true);
  const [errorSpecialChar, setErrorSpecialChar] = useState(true);
  const [errorMin, setErrorMin] = useState(true);
  // ref
  const isFirstRender = useRef<boolean>(true);
  const isFirstRender2 = useRef<boolean>(true);
  // useForm
  const {
    register,
    handleSubmit,
    clearErrors,
    trigger,
    watch,
    resetField,
    formState: { errors }
  } = useForm<JoinReq>({
    resolver: yupResolver(schema)
  });

  // watch
  const userIdValue = watch('userId');
  const passwordValue = watch('password');

  /**-------------------------------- useEffect --------------------------------------*/
  // ID 값 validation 에러 있거나 중복이면 다음버튼 비활성화
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;

      return;
    }
    if (errors.userId || isDuplicate) {
      setDisableIdNext(true);
    } else {
      setDisableIdNext(false);
    }
  }, [isDuplicate, errors]);

  useEffect(() => {
    /*ID 값 validation*/
    const userIdValidate = async () => {
      // ID 중복여부 검사전 초기화
      setIsDuplicate(null);
      // ID 값 validation trigger
      const isEmailFormat = await trigger('userId');
      console.log('=====[userIdValidate]===== userIdValue : ', userIdValue);
      console.log('=====[userIdValidate]===== isEmailFormat : ', isEmailFormat);
      if (userIdValue === '') {
        // userId 값 clear 시 trigger 때문에 required 에러 발생함으로
        // 에러메시지 초기화를 위해 에러 클리어
        clearErrors('userId');

        return;
      } else if (!isEmailFormat) {
        // 이메일 포멧 아니면

        return;
      }

      // ID 중복검사 호출
      callCheckIdDuplicate(userIdValue);
    };

    userIdValidate();
  }, [userIdValue]);

  useEffect(() => {
    const passwordValidate = async () => {
      if (isFirstRender2.current) {
        isFirstRender2.current = false;

        return;
      }
      try {
        const isPasswordFormat = await schema.validate({ password: watch('password') }, { abortEarly: false });
        console.log('=====[passwordValidate]===== isPasswordFormat : ', isPasswordFormat);
        setErrorLowerCase(false);
        setErrorNumber(false);
        setErrorSpecialChar(false);
        setErrorMin(false);
      } catch (err) {
        const validationError = err as yup.ValidationError;
        setErrorLowerCase(validationError.errors.some((e) => e.includes('소문자')));
        setErrorNumber(validationError.errors.some((e) => e.includes('숫자')));
        setErrorSpecialChar(validationError.errors.some((e) => e.includes('특수 문자')));
        setErrorMin(validationError.errors.some((e) => e.includes('이상')));
      }
      if (!passwordValue) {
        clearErrors('password');

        return;
      }
    };

    passwordValidate();
  }, [passwordValue]);

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
  const callCheckIdDuplicate = useCallback(
    debounce(async (userId: string) => {
      try {
        const response = await checkIdDuplicate(userId);
        if (response.code === '0000') {
          setIsDuplicate(response.data);
        }
      } catch (e) {
        console.error('=====[debouncedCheckIdDuplicate]===== error :', e);
        setOpenError(true);
      }
    }, 500),
    []
  );

  /**-------------------------------- 이벤트헨들러 --------------------------------------*/
  /*에러모달 확인 이벤트헨들러*/
  const handleModalClose = useCallback(() => {
    setOpenError(false);
  }, []);

  /*다음 버튼 클릭이벤트*/
  const handleNextClick = () => {
    setStep((prevState) => prevState + 1);
  };

  /*이전 버튼 클릭이벤트*/
  const handleBackClick = () => {
    resetField('password');
    setStep((prevState) => prevState - 1);
  };

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

  /*ID 필드 상태메세지*/
  const IdStatusMessage = () => {
    if (errors.userId) {
      // validation fail
      return <ErrorCaption message={errors.userId.message} />;
    } else if (isDuplicate === false && !errors.userId) {
      // 사용 가능 아이디
      return <SuccessCaption message="사용 가능한 아이디입니다." />;
    } else if (isDuplicate === true) {
      // 아이디 중복
      return <ErrorCaption message="이미 가입된 이메일입니다." />;
    } else {
      return <Box sx={{ height: '20px' }}></Box>;
    }
  };

  /*비밀번호 필드 상태메세지*/
  const PasswordStatusMessage = () => {
    console.log(errors.password);

    return (
      <Stack alignItems="start" spacing={1} my={1}>
        <ErrorSuccessCaption error={errorLowerCase} message="소문자 하나 이상 포함해주세요." />
        <ErrorSuccessCaption error={errorNumber} message="숫자를 하나 이상 포함해주세요." />
        <ErrorSuccessCaption error={errorSpecialChar} message="특수 문자를 하나 이상 포함해주세요." />
        <ErrorSuccessCaption error={errorMin} message="비밀번호는 12자리 이상으로 설정해주세요." />
        <Typography variant="caption"></Typography>
      </Stack>
    );
  };

  /**-------------------------------- const --------------------------------------*/
  const variants = {
    initial: { x: '-100%', opacity: 0 },
    animate: { x: 0, opacity: 1 }
  };

  return (
    <Stack justifyContent="center" alignItems="center">
      {step === 1 && (
        <Stack alignItems="end" justifyContent="end" sx={{ width: '100%', marginBottom: 5 }} onClick={handleBackClick}>
          <BackButton />
        </Stack>
      )}
      <NeighborhoodLogo width="180" height="92" />
      <Typography variant="h3" sx={{ mt: 2 }}>
        회원가입
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1, width: '100%' }}>
        {/**STEP 0 - 아이디 입력*/}
        {step === 0 && (
          <motion.div
            variants={variants}
            initial="initial"
            animate="animate"
            transition={{ ease: 'easeIn', duration: 0.5 }}
          >
            <InputLabel htmlFor="email">아이디</InputLabel>
            <TextField
              id="email"
              placeholder="이메일을 입력해주세요."
              maxLength={12}
              autoFocus
              fullWidth
              {...register('userId')}
              autoComplete="off"
              sx={{ mb: 1 }}
              inputProps={{ maxLength: 254 }}
            />
            <IdStatusMessage />
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              sx={{ mt: 1, mb: 1 }}
              disabled={disableIdNext}
              onClick={handleNextClick}
            >
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                다음
              </Typography>
            </Button>
          </motion.div>
        )}
        {/**STEP 0 - 비밀번호 입력*/}
        {step === 1 && (
          <>
            <motion.div
              variants={variants}
              initial="initial"
              animate="animate"
              transition={{ ease: 'easeIn', duration: 0.5 }}
            >
              <InputLabel htmlFor="password">비밀번호</InputLabel>
              <TextField
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="비밀번호를 입력해주세요."
                maxLength={12}
                autoFocus
                fullWidth
                {...register('password')}
                autoComplete="off"
                InputProps={{
                  endAdornment: <ShowPasswordIcon showPassword={showPassword} setShowPassword={setShowPassword} />
                }}
                inputProps={{ maxLength: 64 }}
                sx={{ mb: 1 }}
              />
              <PasswordStatusMessage />
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                sx={{ mt: 1, mb: 1 }}
                disabled={errorLowerCase || errorNumber || errorSpecialChar || errorMin}
                onClick={handleNextClick}
              >
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  다음
                </Typography>
              </Button>
            </motion.div>
          </>
        )}
      </Box>
      <OneButtonModal title="ERROR" message={checkIdError()} open={openError} onClick={handleModalClose} />
    </Stack>
  );
}
