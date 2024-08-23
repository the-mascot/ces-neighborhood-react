import { Button, Card, Stack } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Post } from 'src/types/board.type';
import { fetchPosts } from 'src/apis/posts';
import LoadingSpinner from 'src/components/loading/loading-spinner';
import ErrorModal from 'src/components/error-modal';
import { useState } from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

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
    <Stack justifyContent="center" alignItems="center">
      <Card variant="outlined">
        <CardContent>
          <Typography>heelod</Typography>
        </CardContent>
      </Card>
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
