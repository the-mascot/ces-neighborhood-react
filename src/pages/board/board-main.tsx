import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Post } from 'src/types/board.type';
import { fetchPosts } from 'src/apis/posts';
import LoadingSpinner from 'src/components/loading/loading-spinner';
import ErrorModal from 'src/components/error-modal';

export default function BoardMain() {
  /**-------------------------------- useQuery --------------------------------------*/
  const { data, isSuccess, isLoading, isError } = useQuery<Post[]>({
    queryKey: ['posts'],
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

  return (
    <Box>
      <Box>리스트</Box>
    </Box>
  );
}
