// react
import React, { useCallback, useEffect, useState } from 'react';

// libraries

// apis
import { Box, Button, Stack } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useMutation, useQuery } from '@tanstack/react-query';

import { fetchPosts, updatePostLike } from 'src/apis/board';
// types
// components
import PostCardComponent from 'src/components/board/PostCardComponent';
import ErrorModal from 'src/components/error-modal';
import LoadingSpinner from 'src/components/loading/loading-spinner';
import { ApiResponse } from 'src/types/api.response';
import { Posts } from 'src/types/board.type';
// @mui

export default function PostList(): JSX.Element {
  const [enable, setEnable] = useState<boolean>(false);
  const [posts, setPosts] = useState<Posts[]>([]);

  /**-------------------------------- useQuery --------------------------------------*/
  const { data, isLoading, isError } = useQuery<ApiResponse<Posts[]>>({
    queryKey: ['posts', enable],
    queryFn: fetchPosts
  });

  /**-------------------------------- useEffect --------------------------------------*/
  /*게시글 data set*/
  useEffect(() => {
    if (data && data.data.length > 0) {
      setPosts(data.data);
    }
  }, [data]);

  /**-------------------------------- useMutation --------------------------------------*/
  const mutation = useMutation({
    mutationFn: updatePostLike
  });

  /**-------------------------------- 이벤트 헨들러 --------------------------------------*/
  const handleClickLike = useCallback(
    (postNo: number) => {
      mutation.mutate(
        {
          postNo,
          postType: 'POST'
        },
        {
          onSuccess: () => {
            setPosts((prevState) =>
              prevState.map((post) => (post.postNo === postNo ? { ...post, isLiked: !post.isLiked } : post))
            );
          }
        }
      );
    },
    [mutation]
  );

  /**-------------------------------- useQuery 결과처리 --------------------------------------*/
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <ErrorModal />;
  }

  /**-------------------------------- memo --------------------------------------*/
  const MemoPostCardComponent = React.memo(PostCardComponent);

  /**-------------------------------- function --------------------------------------*/
  /*게시글 반복 렌더링*/
  const renderPosts = (): JSX.Element => {
    const pairedPosts = [];
    for (let i = 0; i < posts.length; i += 2) {
      pairedPosts.push(
        <Grid key={posts[i].postNo} container direction="row" justifyContent="start" alignItems="center">
          <Grid size={{ xs: 11, lg: 5 }}>
            <MemoPostCardComponent
              post={posts[i]}
              isRight={false}
              handleClickLike={(postNo: number) => handleClickLike(postNo)}
            />
          </Grid>
          {posts[i + 1] && (
            <Grid size={{ xs: 11, lg: 5 }}>
              <MemoPostCardComponent
                post={posts[i + 1]}
                isRight={true}
                handleClickLike={(postNo: number) => handleClickLike(postNo)}
              />
            </Grid>
          )}
        </Grid>
      );
    }

    return <>{pairedPosts}</>;
  };

  return (
    <Stack justifyContent="center" alignItems="center" width="100%">
      <Box alignItems="end" width="100%">
        <Button variant="contained" color="info">
          글쓰기
        </Button>
      </Box>
      <Stack spacing={0}>{renderPosts()}</Stack>
    </Stack>
  );
}
