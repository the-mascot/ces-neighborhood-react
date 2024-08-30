// react
import React, { useCallback, useEffect, useState } from 'react';
// libraries
import { useMutation, useQuery } from '@tanstack/react-query';
// apis
import { fetchPosts, updatePostLike } from 'src/apis/board';
// types
import { Posts } from 'src/types/board.type';
// components
import ErrorModal from 'src/components/error-modal';
import LoadingSpinner from 'src/components/loading/loading-spinner';
import PostCardComponent from 'src/components/board/PostCardComponent';
// @mui
import Grid from '@mui/material/Grid2';
import { Stack } from '@mui/material';

export default function PostList() {
  const [enable, setEnable] = useState<boolean>(false);
  const [posts, setPosts] = useState<Posts[]>([]);

  /**-------------------------------- useQuery --------------------------------------*/
  const { data, isLoading, isError } = useQuery({
    queryKey: ['posts', enable],
    queryFn: fetchPosts
  });

  /**-------------------------------- useEffect --------------------------------------*/
  /*게시글 data set*/
  useEffect(() => {
    if (data) {
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
  const getPosts = () => {
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

    return pairedPosts;
  };

  return (
    <Stack justifyContent="center" alignItems="center" sx={{ width: '100%' }}>
      <Stack spacing={0}>{getPosts()}</Stack>
    </Stack>
  );
}
