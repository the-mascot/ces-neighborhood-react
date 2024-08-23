// react
import { useCallback, useEffect, useState } from 'react';
// redux
import { useDispatch } from 'react-redux';
import { login } from 'src/redux/slices/auth-slice';
// libraries
import * as yup from 'yup';
import { debounce } from 'lodash';
import { AxiosError } from 'axios';
import { useForm, UseFormReturn } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router';
// apis
import { oAuthLogin } from 'src/apis/auth';
import { checkNicknameDuplicate, updateMemberInfo } from 'src/apis/member';
// types
import { OAuthLoginRes } from 'src/types/auth.type';
import { UpdateMemberInfoReq } from 'src/types/member.type';
import { ApiExceptionResponse, ApiResponse } from 'src/types/api.response';
// components
import OneButtonModal from 'src/components/one-button-modal';
import ErrorModal from 'src/components/error-modal';
import { NeighborhoodLogo } from 'src/components/icon/index';
import ButtonClearIcon from 'src/components/button-clear-icon';
import ErrorCaption from 'src/components/error-caption';
import SuccessCaption from 'src/components/success-caption';

// @mui
import { Box, Button, InputLabel, Stack, TextField, Typography } from '@mui/material';
import LoadingSpinner from 'src/components/loading/loading-spinner';

const schema = yup.object().shape({
  nickname: yup
    .string()
    .min(2, '닉네임은 최소 두글자 이상으로 설정해주세요.')
    .max(10, '닉네임은 최대 10글자 이하로 설정해주세요.')
    .required('닉네임을 입력해주세요.')
});
export default function OauthLogin() {
  // navigate
  const navigate = useNavigate();
  // query param
  const [searchParams] = useSearchParams();
  const codeParams = searchParams.get('code');
  const stateParams = searchParams.get('state');
  const { registrationId } = useParams();
  // redux
  const dispatch = useDispatch();
  // states
  const [code, setCode] = useState<string>(''); // authorization code
  const [csrfState, setCsrfState] = useState<string>(''); // state
  const [openError, setOpenError] = useState<boolean>(false); // error modal
  const [disableNext, setDisableNext] = useState<boolean>(false); // 확인버튼 disable
  const [isDuplicateNickname, setIsDuplicateNickname] = useState<boolean | null>(null); // 닉네임 중복여부
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false); // 가입 진행 flag

  /**-------------------------------- useForm --------------------------------------*/
  const form = useForm<UpdateMemberInfoReq>({
    resolver: yupResolver(schema)
  });

  const nicknameValue = form.watch('nickname');

  /**-------------------------------- useQuery --------------------------------------*/
  const { data, isLoading, isError, isSuccess, error } = useQuery<
    ApiResponse<OAuthLoginRes>,
    AxiosError<ApiExceptionResponse>
  >({
    queryKey: ['oAuth', code, csrfState],
    queryFn: () => oAuthLogin(registrationId as string, code, csrfState),
    enabled: !!code && !!csrfState,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false
  });

  /**-------------------------------- useMutation --------------------------------------*/
  const mutation = useMutation({
    mutationFn: updateMemberInfo
  });

  /**-------------------------------- useEffect --------------------------------------*/
  useEffect(() => {
    console.log('=====[useEffect]===== codeParams : ', codeParams);
    console.log('=====[useEffect]===== stateParams : ', stateParams);
    if (registrationId && codeParams && stateParams) {
      setCode(codeParams as string);
      setCsrfState(stateParams as string);
    } else {
      setOpenError(true);
    }
  }, [searchParams, codeParams, registrationId, stateParams]);

  /*신규 회원이면 추천닉네임 form data에 set*/
  useEffect(() => {
    if (isSuccess && data.data.isNewMember) {
      form.setValue('nickname', data.data.nickname);
    } else if (isSuccess) {
      dispatch(login({ nickname: data.data.nickname.toString(), profileImage: data.data.profileImage.toString() }));
      navigate('/', { replace: true });
    }
  }, [isSuccess]);

  /*완료 버튼 disable*/
  useEffect(() => {
    if (form.formState.errors.nickname || isDuplicateNickname === true || isSubmitting) {
      setDisableNext(true);
    } else {
      setDisableNext(false);
    }
  }, [isDuplicateNickname, form.formState.errors.nickname, isSubmitting]);

  /*닉네임 변경 시 validation*/
  useEffect(() => {
    const nicknameValidate = async () => {
      const isNicknameFormat = await form.trigger('nickname');
      if (!isDuplicateNickname) {
        return;
      }
      if (!isNicknameFormat) {
        return;
      }
      callCheckNicknameDuplicate(nicknameValue);
    };

    nicknameValidate();
  }, [nicknameValue]);

  /**-------------------------------- onSubmit --------------------------------------*/
  /*닉네임 변경*/
  const onSubmit = async (submitData: UpdateMemberInfoReq) => {
    setIsSubmitting(true);
    if (data && submitData.nickname !== data.data.nickname) {
      mutation.mutate(submitData, {
        onSuccess: () => {
          dispatch(
            login({ nickname: submitData.nickname.toString(), profileImage: data.data.profileImage.toString() })
          );
          navigate('/');
        },
        onError: () => {
          setOpenError(true);
          setIsSubmitting(false);
        }
      });
    } else {
      navigate('/');
    }
  };

  /**-------------------------------- apis --------------------------------------*/
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
        setOpenError(true);
      }
    }, 500),
    []
  );

  /**-------------------------------- 이벤트헨들러 --------------------------------------*/
  /*에러모달 확인 클릭이벤트*/
  const handleErrorConfirm = () => {
    navigate('/login');
  };

  /**-------------------------------- useQuery 결과처리 --------------------------------------*/
  if (isSuccess) {
    if (data.data.isNewMember) {
      // 회원가입의 경우 닉네임 지정 화면
      return (
        <NicknameForm
          form={form}
          onSubmit={onSubmit}
          disableNext={disableNext}
          isDuplicateNickname={isDuplicateNickname}
          recommendNickname={data.data.nickname}
        />
      );
    }
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <ErrorModal />;
  }

  return <OneButtonModal title="ERROR" open={openError} onClick={handleErrorConfirm} />;
}

type Props = {
  form: UseFormReturn<UpdateMemberInfoReq>;
  onSubmit: (data: UpdateMemberInfoReq) => Promise<void>;
  disableNext: boolean;
  isDuplicateNickname: boolean | null;
  recommendNickname: string;
};

function NicknameForm({ form, onSubmit, disableNext, isDuplicateNickname, recommendNickname }: Props) {
  /*닉네임 필드 상태메시지*/
  const NicknameStatusMessage = () => {
    if (form.formState.errors.nickname) {
      return <ErrorCaption message={form.formState.errors.nickname.message} />;
    } else if (isDuplicateNickname === true) {
      return <ErrorCaption message="중복되는 닉네임이에요." />;
    } else {
      return <SuccessCaption message="사용 가능한 닉네임입니다." />;
    }
  };

  return (
    <Stack justifyContent="center" alignItems="center">
      <NeighborhoodLogo width="180" height="92" />
      <Typography variant="h3" sx={{ mt: 2, mb: 5 }}>
        회원가입
      </Typography>
      <Box component="form" onSubmit={form.handleSubmit(onSubmit)} sx={{ mt: 1, width: '100%' }}>
        <Box sx={{ textAlign: 'start', marginBottom: 3 }}>
          <Stack direction="row">
            <Typography variant="body1">추천 닉네임은 </Typography>
            <Typography variant="body1" color="error" sx={{ fontWeight: 600 }}>
              {recommendNickname}
            </Typography>
            <Typography variant="body1"> 입니다.</Typography>
          </Stack>
          <Typography variant="body1">그대로 사용하시거나 변경 후 완료를 눌려주세요!</Typography>
        </Box>
        <InputLabel htmlFor="nickname">닉네임</InputLabel>
        <TextField
          id="nickname"
          placeholder="닉네임을 입력해주세요."
          autoFocus
          fullWidth
          {...form.register('nickname')}
          autoComplete="off"
          sx={{ mb: 1 }}
          defaultValue={recommendNickname}
          inputProps={{ maxLength: 10 }}
          InputProps={{
            endAdornment: <ButtonClearIcon onClick={() => form.resetField('nickname')} />
          }}
        />
        <NicknameStatusMessage />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="secondary"
          sx={{ mt: 1, mb: 1 }}
          disabled={disableNext}
        >
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            완료
          </Typography>
        </Button>
      </Box>
    </Stack>
  );
}
