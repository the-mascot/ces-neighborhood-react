// react
import { useEffect, useState } from 'react';
// libraries
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router';
// apis
import { oAuthLogin } from 'src/apis/auth';
// types
import { ApiExceptionResponse, ApiResponse } from 'src/types/api.response';
// components
import OneButtonModal from 'src/components/one-button-modal';
import ErrorModal from 'src/components/error-modal';
import { AxiosError } from 'axios';

export default function OauthLogin() {
  // navigate
  const navigate = useNavigate();
  // query param
  const [searchParams] = useSearchParams();
  const codeParams = searchParams.get('code');
  const stateParams = searchParams.get('state');
  const { registrationId } = useParams();
  // states
  const [code, setCode] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [openError, setOpenError] = useState<boolean>(false);

  /**-------------------------------- useEffect --------------------------------------*/
  useEffect(() => {
    console.log('=====[useEffect]===== codeParams : ', codeParams);
    console.log('=====[useEffect]===== stateParams : ', stateParams);
    if (registrationId && codeParams && stateParams) {
      setCode(codeParams as string);
      setState(stateParams as string);
    } else {
      setOpenError(true);
    }
  }, [searchParams, codeParams, registrationId]);

  /**-------------------------------- useQuery --------------------------------------*/
  const { data, isLoading, isError, isSuccess, error } = useQuery<ApiResponse<null>, AxiosError<ApiExceptionResponse>>({
    queryKey: ['oauth'],
    queryFn: () => oAuthLogin(registrationId as string, code, state),
    enabled: !!code && !!state,
    retry: false
  });

  if (isSuccess) {
    navigate('/');
  }

  if (isError) {
    if (error.response) {
      const { errCode, errMsg, responseTime } = error.response.data;
      if (errCode === '1004') {
        navigate('/join/');
      }
    }

    return <ErrorModal />;
  }

  /**-------------------------------- 이벤트헨들러 --------------------------------------*/
  const handleErrorConfirm = () => {
    navigate('/login');
  };

  return (
    <>
      <OneButtonModal title="ERROR" open={openError} onClick={handleErrorConfirm} />
    </>
  );
}
