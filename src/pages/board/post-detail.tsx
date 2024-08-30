import { Stack } from '@mui/system';
import { Typography } from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router';
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchPost } from 'src/apis/board';
import LoadingSpinner from 'src/components/loading/loading-spinner';
import ErrorModal from 'src/components/error-modal';

export default function PostDetail() {
  const { postNoParams } = useParams();
  const navigate = useNavigate();
  const [postNo, setPostNo] = useState<number | null>(null);

  useEffect(() => {
    console.log('postNo is Not a Number : ', isNaN(Number(postNoParams)));
    if (postNoParams && isNaN(Number(postNo))) {
      setPostNo(Number(postNoParams));
    } else {
      navigate('/404');
    }
  }, []);

  /**-------------------------------- useQuery --------------------------------------*/
  const { data, isLoading, isError } = useQuery({
    queryKey: [postNo],
    queryFn: () => fetchPost(postNo as number)
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
