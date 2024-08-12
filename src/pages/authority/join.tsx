// react
import { useCallback, useEffect, useRef, useState } from 'react';
// libraries
import * as yup from 'yup';
import { debounce } from 'lodash';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { motion } from 'framer-motion';
// apis
import { join } from 'src/apis/auth';
import { checkIdDuplicate, checkNicknameDuplicate } from 'src/apis/member';
// types
import { JoinReq } from 'src/types/auth.type';
// components
import OneButtonModal from 'src/components/one-button-modal';
import { ReactComponent as NeighborhoodLogo } from 'src/assets/images/neighborhood_logo.svg';
import ShowPasswordIcon from 'src/components/authority/show-password-icon';
import ErrorCaption from 'src/components/error-caption';
import ErrorSuccessCaption from 'src/components/error-success-caption';
import SuccessCaption from 'src/components/success-caption';
import BackButton from 'src/components/back-button';
import ButtonClearIcon from 'src/components/button-clear-icon';
// @mui
import { Box, Button, InputLabel, Stack, TextField, Typography } from '@mui/material';
import CelebrationIcon from '@mui/icons-material/Celebration';

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
    .required('비밀번호를 입력해주세요'),
  nickname: yup
    .string()
    .min(2, '닉네임은 최소 두글자 이상으로 설정해주세요.')
    .max(10, '닉네임은 최대 10글자 이하로 설정해주세요.')
    .required()
});

export default function Join() {
  // navigate
  const navigate = useNavigate();
  // states
  const [step, setStep] = useState<number>(0); // 입력 단게 (0: 아이디 -> 1: 비밀번호 2 -> 닉네임)
  const [isDuplicateId, setIsDuplicateId] = useState<boolean | null>(null); // 아이디 중복여부
  const [isDuplicateNickname, setIsDuplicateNickname] = useState<boolean | null>(null); // 닉네임 중복여부
  const [openCheckError, setOpenCheckError] = useState<boolean>(false); // 중복체크 에러모달
  const [openJoinError, setOpenJoinError] = useState<boolean>(false); // 가입진행 에러모달
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false); // 가입 진행 flag
  const [disableIdNext, setDisableIdNext] = useState<boolean>(true); // step 0 다음 비활성화 여부
  const [disableNicknameNext, setDisableNicknameNext] = useState<boolean>(true); // step 2 다음 비활성화 여부
  const [showPassword, setShowPassword] = useState<boolean>(false); // 비밀번호 보이기
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
  const nickNameValue = watch('nickname');

  /**-------------------------------- useEffect --------------------------------------*/
  // step 0 다음버튼 비활성화 관리
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;

      return;
    }
    if (errors.userId || isDuplicateId === true || isDuplicateId === null) {
      setDisableIdNext(true);
    } else {
      setDisableIdNext(false);
    }
  }, [isDuplicateId, errors.userId]);

  // step 2 다음버튼 비활성화 관리
  useEffect(() => {
    if (isFirstRender2.current) {
      isFirstRender2.current = false;

      return;
    }
    if (errors.nickname || isDuplicateNickname === true || isDuplicateNickname === null || isSubmitting) {
      setDisableNicknameNext(true);
    } else {
      setDisableNicknameNext(false);
    }
  }, [isDuplicateNickname, errors.nickname, isSubmitting]);

  /*ID 값 변경 시 validation*/
  useEffect(() => {
    const userIdValidate = async () => {
      // ID 중복여부 검사전 초기화
      setIsDuplicateId(null);
      if (!userIdValue) {
        // userId 값 clear 시 trigger 때문에 required 에러 발생함으로
        // 에러메시지 초기화를 위해 에러 클리어
        clearErrors('userId');

        return;
      }
      // ID 값 validation trigger
      const isEmailFormat = await trigger('userId');
      console.log('=====[userIdValidate]===== userIdValue : ', userIdValue);
      console.log('=====[userIdValidate]===== isEmailFormat : ', isEmailFormat);
      if (!isEmailFormat) {
        // 이메일 포멧 아니면

        return;
      }

      // ID 중복검사 호출
      callCheckIdDuplicate(userIdValue);
    };

    userIdValidate();
  }, [userIdValue]);

  /*비밀번호 변경 시 validation*/
  useEffect(() => {
    const passwordValidate = async () => {
      setErrorLowerCase(true);
      setErrorNumber(true);
      setErrorSpecialChar(true);
      setErrorMin(true);
      if (!passwordValue) {
        clearErrors('password');

        return;
      }

      try {
        const isPasswordFormat = await schema.validate({ password: watch('password') }, { abortEarly: false });
        console.log('=====[passwordValidate]===== isPasswordFormat : ', isPasswordFormat);
      } catch (err) {
        const validationError = err as yup.ValidationError;
        setErrorLowerCase(validationError.errors.some((e) => e.includes('소문자')));
        setErrorNumber(validationError.errors.some((e) => e.includes('숫자')));
        setErrorSpecialChar(validationError.errors.some((e) => e.includes('특수 문자')));
        setErrorMin(validationError.errors.some((e) => e.includes('이상')));
      }
    };

    passwordValidate();
  }, [passwordValue]);

  /*닉네임 변경 시 validation*/
  useEffect(() => {
    const nicknameValidate = async () => {
      // 닉네임 중복 초기화
      setIsDuplicateNickname(null);
      if (!nickNameValue) {
        clearErrors('nickname');

        return;
      }
      const isNicknameFormat = await trigger('nickname');
      if (!isNicknameFormat) {
        return;
      }
      callCheckNicknameDuplicate(nickNameValue);
    };

    nicknameValidate();
  }, [nickNameValue]);

  /**-------------------------------- useMutation --------------------------------------*/
  /*회원가입 mutation*/
  const mutation = useMutation({
    mutationFn: join
  });

  /**-------------------------------- onSubmit --------------------------------------*/
  /*회원가입 onsubmit*/
  const onSubmit = async (data: JoinReq) => {
    setIsSubmitting(true);
    mutation.mutate(data, {
      onSuccess: () => {
        handleNextClick();
      },
      onError: () => {
        setIsSubmitting(false);
        setOpenJoinError(true);
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
          setIsDuplicateId(response.data);
        }
      } catch (e) {
        console.error('=====[debouncedCheckIdDuplicate]===== error :', e);
        setOpenJoinError(true);
      }
    }, 500),
    []
  );

  /*nickname 중복체크(debounce) */
  const callCheckNicknameDuplicate = useCallback(
    debounce(async (nickname: string) => {
      try {
        const response = await checkNicknameDuplicate(nickname);
        if (response.code === '0000') {
          setIsDuplicateNickname(response.data);
        }
      } catch (e) {
        console.error('=====[callCheckNicknameDuplicate]===== error :', e);
        setOpenJoinError(true);
      }
    }, 500),
    []
  );

  /**-------------------------------- 이벤트헨들러 --------------------------------------*/
  /*중복검사 모달 확인 이벤트헨들러*/
  const handleCheckModalClose = useCallback(() => {
    setOpenCheckError(false);
  }, []);

  /*에러모달 확인 이벤트헨들러*/
  const handleJoinModalClose = useCallback(() => {
    setOpenJoinError(false);
  }, []);

  /*다음 버튼 클릭이벤트*/
  const handleNextClick = () => {
    setStep((prevState) => prevState + 1);
  };

  /*이전 버튼 클릭이벤트*/
  const handleBackClick = () => {
    if (step === 0) {
      navigate('/login', { replace: true });
    }
    resetField('userId');
    resetField('password');
    resetField('nickname');
    setStep((prevState) => prevState - 1);
  };

  /*로그인 하러가기 클릭이벤트*/
  const handleGoLogin = () => {
    navigate('/login', { replace: true });
  };

  /**-------------------------------- components --------------------------------------*/
  /*ID 중복체크 에러메세지*/
  const CheckIdError = () => {
    return (
      <>
        <Typography variant="subtitle1">중복검사중 에러발생.</Typography>
        <Typography variant="subtitle1">잠시후에 다시 시도해주세요.</Typography>
      </>
    );
  };

  /*회원가입 에러메세지*/
  const JoinError = () => {
    return (
      <>
        <Typography variant="subtitle1">회원 가입 처리중 에러발생.</Typography>
        <Typography variant="subtitle1">잠시후에 다시 시도해주세요.</Typography>
      </>
    );
  };

  /*ID 필드 상태메세지*/
  const IdStatusMessage = () => {
    if (errors.userId) {
      // validation fail
      return <ErrorCaption message={errors.userId.message} />;
    } else if (isDuplicateId === true) {
      // 아이디 중복
      return <ErrorCaption message="이미 가입된 이메일입니다." />;
    } else if (isDuplicateId === false && !errors.userId) {
      // 사용 가능 아이디
      return <SuccessCaption message="사용 가능한 아이디입니다." />;
    } else {
      return <Box sx={{ height: '20px' }} />;
    }
  };

  /*비밀번호 필드 상태메세지*/
  const PasswordStatusMessage = () => {
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

  const NicknameStatusMessage = () => {
    if (errors.nickname) {
      return <ErrorCaption message={errors.nickname.message} />;
    } else if (isDuplicateNickname === true) {
      return <ErrorCaption message="중복되는 닉네임이에요." />;
    } else if (isDuplicateNickname === false && !errors.nickname) {
      return <SuccessCaption message="사용 가능한 닉네임입니다." />;
    } else {
      return <Box sx={{ height: '20px' }} />;
    }
  };

  /**-------------------------------- const --------------------------------------*/
  const variants = {
    initial: { x: '-100%', opacity: 0 },
    animate: { x: 0, opacity: 1 }
  };

  return (
    <Stack justifyContent="center" alignItems="center">
      {step < 3 && (
        <Stack alignItems="end" justifyContent="end" sx={{ width: '100%', marginBottom: 5 }} onClick={handleBackClick}>
          <BackButton />
        </Stack>
      )}
      <NeighborhoodLogo width="180" height="92" />
      <Typography variant="h3" sx={{ mt: 2, mb: 5 }}>
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
              InputProps={{
                endAdornment: <ButtonClearIcon onClick={() => resetField('userId')} />
              }}
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
        {/**STEP 1 - 비밀번호 입력*/}
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
        {/**STEP 2 - 닉네임 입력*/}
        {step === 2 && (
          <>
            <motion.div
              variants={variants}
              initial="initial"
              animate="animate"
              transition={{ ease: 'easeIn', duration: 0.5 }}
            >
              <InputLabel htmlFor="password">닉네임</InputLabel>
              <TextField
                id="nickname"
                type="text"
                placeholder="사용할 닉네임을 입력해주세요."
                maxLength={12}
                autoFocus
                fullWidth
                {...register('nickname')}
                autoComplete="off"
                InputProps={{
                  endAdornment: <ButtonClearIcon onClick={() => resetField('nickname')} />
                }}
                inputProps={{ maxLength: 10 }}
                sx={{ mb: 1 }}
              />
              <NicknameStatusMessage />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                sx={{ mt: 1, mb: 1 }}
                disabled={disableNicknameNext}
                onClick={handleSubmit(onSubmit)}
              >
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  다음
                </Typography>
              </Button>
            </motion.div>
          </>
        )}
        {step === 3 && (
          <>
            <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
              <Typography variant="h3" lineHeight="3">
                환영합니다!
              </Typography>
              <CelebrationIcon color="warning" width="60px" height="30px" />
            </Stack>
            <Typography variant="h5">회원가입이 완료되었습니다.</Typography>
            <Button variant="contained" color="secondary" onClick={handleGoLogin} sx={{ mt: 5 }}>
              로그인 하러가기
            </Button>
          </>
        )}
      </Box>
      <OneButtonModal title="ERROR" message={CheckIdError()} open={openCheckError} onClick={handleCheckModalClose} />
      <OneButtonModal title="ERROR" message={JoinError()} open={openJoinError} onClick={handleJoinModalClose} />
    </Stack>
  );
}
