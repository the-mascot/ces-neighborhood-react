// react
import { useEffect, useState } from 'react';
// libraries
import { useNavigate, useParams } from 'react-router';
import { useSearchParams } from 'react-router-dom';
// components
import OneButtonModal from 'src/components/one-button-modal';
import { useQuery } from '@tanstack/react-query';
import { oAuthLogin } from 'src/apis/auth';
import { ApiResponse } from 'src/types/api.response';

const REGISTRATION_ID = {
  NAVER: 'naver',
  GOOGLE: 'google'
};

export default function NaverLogin() {
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

  const { data, isLoading, isError, isSuccess } = useQuery<Promise<ApiResponse<null>>>({
    queryKey: [code, state],
    queryFn: () => oAuthLogin(registrationId as string, code, state),
    enabled: !!code && !!state
  });

  useEffect(() => {
    if (!registrationId || !codeParams || !stateParams) {
      setOpenError(true);

      return;
    }
    console.log('=====[useEffect]===== codeParams : ', codeParams);
    console.log('=====[useEffect]===== stateParams : ', stateParams);
    setCode(codeParams as string);
    setState(stateParams as string);
  }, []);

  if (isSuccess) {
    navigate('/');
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
