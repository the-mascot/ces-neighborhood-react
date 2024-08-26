import { Box, Button, Card, CardHeader, Grid, Link, Stack } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Post } from 'src/types/board.type';
import { fetchPosts } from 'src/apis/posts';
import LoadingSpinner from 'src/components/loading/loading-spinner';
import ErrorModal from 'src/components/error-modal';
import { useState } from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import { RouterLink } from 'src/routes/components';

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

export default function BoardMain() {
  const [enable, setEnable] = useState<boolean>(false);
  /**-------------------------------- useQuery --------------------------------------*/
  const { data, isSuccess, isLoading, isError } = useQuery<Post[]>({
    queryKey: ['posts', enable],
    queryFn: fetchPosts,
    enabled: enable
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

  return (
    <Stack justifyContent="center" alignItems="center" sx={{ width: '100%' }}>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={11} lg={5}>
          <PostCardLeft>
            <CardContent>
              <Typography
                variant="subtitle1"
                sx={{
                  maxWidth: '100%',
                  marginBottom: 5
                }}
                noWrap
              >
                <Link component={RouterLink} href="/post/id">
                  heeloddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                </Link>
              </Typography>
              <Box
                sx={{
                  paddingInline: '20px',
                  boxSizing: 'inherit',
                  height: '88px',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  maxWidth: '100%',
                  display: '-webkit-box',
                  webkitBoxOrient: 'vertical',
                  webkitLineClamp: 3,
                  lineClamp: 3,
                  marginBottom: 5
                }}
              >
                <Typography variant="body2">
                  이끼마쇼fffffffffffffffffffffffffffffffffff이끼마쇼fffffffffffffffffffffffffffffffffff
                  이끼마쇼fffffffffffffffffffffffffffffffffff이끼마쇼fffffffffffffffffffffffffffffffffff
                  이끼마쇼fffffffffffffffffffffffffffffffffff이끼마쇼fffffffffffffffffffffffffffffffffff
                </Typography>
              </Box>
            </CardContent>
          </PostCardLeft>
        </Grid>
        <Grid item xs={11} lg={5}>
          <PostCardRight>
            <CardContent>
              <Typography>heelod</Typography>
            </CardContent>
          </PostCardRight>
        </Grid>
      </Grid>
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
