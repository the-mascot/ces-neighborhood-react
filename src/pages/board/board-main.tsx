// react
import { useCallback, useEffect, useState } from 'react';
import React from 'react';
// libraries
import { useMutation, useQuery } from '@tanstack/react-query';
// apis
import { fetchPosts, updatePostLike } from 'src/apis/board';
// types
import { Posts } from 'src/types/board.type';
// components
import { RouterLink } from 'src/routes/components';
import ErrorModal from 'src/components/error-modal';
import LoadingSpinner from 'src/components/loading/loading-spinner';
// @mui
import Grid from '@mui/material/Grid2';
import { styled } from '@mui/system';
import { Box, Button, Card, IconButton, Link, Stack, Tooltip, CardContent, Typography } from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';

/*게시글 제목(Typography)*/
const PostTitle = styled(Typography)(({ theme }) => ({
  maxWidth: '100%',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  WebkitLineClamp: 2, // 표시할 줄 수를 설정합니다. 여기서는 2줄로 설정
  lineHeight: '1.5', // 줄 간격을 설정 (옵션)
  maxHeight: '3.0em', // 최대 높이를 줄 수에 맞게 설정
  minHeight: '3.0em'
}));

/*게시글 본문(Typography)*/
const PostBody = styled(Typography)(({ theme }) => ({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  WebkitLineClamp: 3, // 표시할 줄 수를 설정합니다. 여기서는 2줄로 설정
  lineHeight: '1.5', // 줄 간격을 설정 (옵션)
  maxHeight: '4.5em', // 최대 높이를 줄 수에 맞게 설정
  minHeight: '4.5em'
}));

export default function BoardMain() {
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

  const MemoPostCardComponent = React.memo(PostCardComponent);

  /**-------------------------------- function --------------------------------------*/
  /*게시글 반복 렌더링*/
  const getPosts = () => {
    const pairedPosts = [];
    for (let i = 0; i < posts.length; i += 2) {
      pairedPosts.push(
        <Grid key={i} container direction="row" justifyContent="start" alignItems="center">
          <Grid key={posts[i].postNo} size={{ xs: 11, lg: 5 }}>
            <MemoPostCardComponent
              post={posts[i]}
              isRight={false}
              handleClickLike={(postNo) => handleClickLike(postNo)}
            />
          </Grid>
          {posts[i + 1] && (
            <Grid key={posts[i + 1].postNo} size={{ xs: 11, lg: 5 }}>
              <MemoPostCardComponent
                post={posts[i + 1]}
                isRight={true}
                handleClickLike={(postNo) => handleClickLike(postNo)}
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

type PostCardProps = {
  isRight: boolean;
};

const PostCard = styled(Card)(({ isRight }: PostCardProps) => ({
  variant: 'outlined',
  minHeight: '210px',
  backgroundColor: '#FFF',
  borderLeft: 0,
  ...(isRight && { borderRight: 0 })
}));

type PostCardComponentProps = {
  post: Posts;
  isRight: boolean;
  handleClickLike: (postNo: number) => void;
};

export function PostCardComponent({ post, isRight, handleClickLike }: PostCardComponentProps) {
  return (
    <PostCard isRight={isRight}>
      <CardContent>
        <Grid mb={2}>
          <PostTitle variant="subtitle1">
            <Link component={RouterLink} href={`/post/${encodeURIComponent(post.postNo)}`}>
              {post.title}
            </Link>
          </PostTitle>
        </Grid>
        <Grid container justifyContent="start" alignItems="start" mb={4}>
          <Grid size={post.fileUrl ? 9 : 12}>
            <PostBody variant="body2">
              <Link component={RouterLink} href={`/post/${encodeURIComponent(post.postNo)}`}>
                {post.content}
              </Link>
            </PostBody>
          </Grid>
          {post.fileUrl && (
            <Grid
              container
              size={3}
              sx={{ maxHeight: '1em', minHeight: '1em' }}
              justifyContent="center"
              alignItems="start"
            >
              <Link component={RouterLink} href={`/post/${encodeURIComponent(post.postNo)}`}>
                <img src={post.fileUrl} width="80px" height="80px" alt="hellod" />
              </Link>
            </Grid>
          )}
        </Grid>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid container size={6} spacing={2}>
            <Stack direction="row" spacing={1}>
              <Tooltip title="조회수">
                <VisibilityOutlinedIcon color="action" height={8} width={8} sx={{ mt: '1px' }} aria-label="조회수" />
              </Tooltip>
              <Typography variant="caption">{post.viewCnt}</Typography>
            </Stack>
            <Stack direction="row" spacing={1}>
              <Tooltip title="댓글수">
                <ChatOutlinedIcon color="action" height={8} width={8} sx={{ mt: '1px' }} />
              </Tooltip>
              <Typography variant="caption">{post.commentCnt}</Typography>
            </Stack>
            <Tooltip title="좋아요">
              <IconButton onClick={() => handleClickLike(post.postNo)} sx={{ p: 0 }}>
                {post.isLiked ? (
                  <FavoriteIcon color="error" height={6} width={6} />
                ) : (
                  <FavoriteBorderOutlinedIcon color="action" height={6} width={6} />
                )}
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid container size={6} justifyContent="end" alignItems="center">
            <Typography variant="button">{post.createElapsedTime}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </PostCard>
  );
}
