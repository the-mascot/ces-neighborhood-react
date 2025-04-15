import React, { useEffect, useState } from 'react';

import { Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { useQuery } from '@tanstack/react-query';
import { useLocation, useNavigate, useParams } from 'react-router';

import { fetchPost } from 'src/apis/board';
import ErrorModal from 'src/components/error-modal';
import LoadingSpinner from 'src/components/loading/loading-spinner';

export default function PostDetail() {
  const { postNo } = useParams();
  const navigate = useNavigate();
  const [postNoState, setPostNoState] = useState<number | null>(null);

  useEffect(() => {
    console.log('=====[useEffect]===== postNo : ', postNo);
    if (postNo && !isNaN(Number(postNo))) {
      setPostNoState(Number(postNo));
    } else {
      navigate('/404');
    }
  }, [postNo]);

  /**-------------------------------- useQuery --------------------------------------*/
  const { data, isLoading, isError } = useQuery({
    queryKey: [postNoState],
    queryFn: () => fetchPost(postNoState as number),
    enabled: !!postNoState,
  });

  /**-------------------------------- useQuery 결과처리 --------------------------------------*/
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <ErrorModal />;
  }

  return (
    <Stack>
      <Typography>dd</Typography>
    </Stack>
  );
}
