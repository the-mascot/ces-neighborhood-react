// react
import { useEffect, useState } from 'react';
// libraries
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
// components
import OneButtonModal from 'src/components/one-button-modal';
import { useQuery } from '@tanstack/react-query';
import { naverLogin } from 'src/apis/auth';
import { OAuthLoginReq } from 'src/types/auth.type';
import { ApiResponse } from 'src/types/api.response';

export default function NaverLogin() {
  // navigate
  const navigate = useNavigate();
  // query param
  const [searchParams] = useSearchParams();
  const codeParams = searchParams.get('code');
  const stateParams = searchParams.get('state');
  // states
  const [code, setCode] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [openError, setOpenError] = useState<boolean>(false);

  const { data, isLoading, isError, isSuccess } = useQuery<Promise<ApiResponse<null>>>({
    queryKey: [code, state],
    queryFn: () => naverLogin(code, state),
    enabled: !!code && !!state
  });

  useEffect(() => {
    if (!codeParams || !stateParams) {
      setOpenError(true);

      return;
    }
    console.log('=====[useEffect]===== codeParams : ', codeParams);
    console.log('=====[useEffect]===== stateParams : ', stateParams);
    setCode(codeParams as string);
    setState(stateParams as string);
  }, []);

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
