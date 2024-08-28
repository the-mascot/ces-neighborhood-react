import { Box, Button, Card, CardHeader, Link, Stack } from '@mui/material';

import { useQuery } from '@tanstack/react-query';
import { fetchPosts } from 'src/apis/posts';
import LoadingSpinner from 'src/components/loading/loading-spinner';
import ErrorModal from 'src/components/error-modal';
import { useState } from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import { RouterLink } from 'src/routes/components';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import Grid from '@mui/material/Grid2';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
const PostCardLeft = styled(Card)(({ theme }) => ({
  variant: 'outlined',
  minHeight: '210px',
  backgroundColor: '#FFF',
  borderLeft: 0
}));

const PostCardRight = styled(Card)(({ theme }) => ({
  variant: 'outlined',
  minHeight: '210px',
  backgroundColor: '#FFF',
  borderRight: 0,
  borderLeft: 0
}));

const PostBody = styled(Typography)(({ theme }) => ({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  WebkitLineClamp: 3, // 표시할 줄 수를 설정합니다. 여기서는 2줄로 설정
  lineHeight: '1.5', // 줄 간격을 설정 (옵션)
  maxHeight: '4.5em' // 최대 높이를 줄 수에 맞게 설정
}));

export default function BoardMain() {
  const [enable, setEnable] = useState<boolean>(false);
  /**-------------------------------- useQuery --------------------------------------*/
  const { data, isSuccess, isLoading, isError } = useQuery({
    queryKey: ['posts', enable],
    queryFn: fetchPosts
  });

  if (isSuccess) {
    console.log(data);
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <ErrorModal />;
  }

  const getPosts = () => {
    if (data && data.data) {
      const pairedPosts = [];
      for (let i = 0; i < data.data.length; i += 2) {
        pairedPosts.push(
          <Grid key={i} container justifyContent="start" alignItems="center">
            <Grid size={{ xs: 11, lg: 5 }}>
              <PostCardLeft>
                <CardContent>
                  <Typography
                    variant="subtitle1"
                    noWrap
                    sx={{
                      maxWidth: '100%',
                      marginBottom: 5
                    }}
                  >
                    <Link component={RouterLink} href={`/post/${encodeURIComponent(data.data[i].postNo)}`}>
                      {data.data[i].title}
                    </Link>
                  </Typography>
                  <Grid container justifyContent="start" alignItems="center" mb={4}>
                    <Grid size={data.data[i].fileUrl ? 7 : 12}>
                      <PostBody variant="body2">
                        <Link component={RouterLink} href="/post/id">
                          {data.data[i].content}
                        </Link>
                      </PostBody>
                    </Grid>
                  </Grid>
                  <Grid container justifyContent="space-between" alignItems="center">
                    <Grid container size={6} spacing={2}>
                      <Stack direction="row" spacing={1}>
                        <VisibilityOutlinedIcon color="action" height={8} width={8} sx={{ mt: '1px' }} />
                        <Typography variant="caption">{data.data[i].viewCnt}</Typography>
                      </Stack>
                      <Stack direction="row" spacing={1}>
                        <ChatOutlinedIcon color="action" height={8} width={8} sx={{ mt: '1px' }} />
                        <Typography variant="caption">{data.data[i].commentCnt}</Typography>
                      </Stack>
                      <Box>
                        {data.data[i].isLiked ? (
                          <FavoriteIcon color="error" height={8} width={8} sx={{ mt: '1px' }} />
                        ) : (
                          <FavoriteBorderOutlinedIcon color="action" height={8} width={8} sx={{ mt: '1px' }} />
                        )}
                      </Box>
                    </Grid>
                    <Grid container size={6} justifyContent="end" alignItems="center">
                      <Typography>{data.data[i].createElapsedTime}</Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </PostCardLeft>
            </Grid>
          </Grid>
        );
      }

      return pairedPosts;
    }
  };

  return (
    <Stack justifyContent="center" alignItems="center" sx={{ width: '100%' }}>
      {getPosts()}
      <Button
        type="button"
        onClick={() => {
          console.log('clcik');
          setEnable(true);
        }}
        variant="contained"
        sx={{ width: '360px', marginTop: 5 }}
      >
        시작
      </Button>
    </Stack>
  );
}
