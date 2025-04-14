// types
// components
// @mui
import { styled } from '@mui/system';
import Grid from '@mui/material/Grid';
import { Card, CardContent, IconButton, Link, Stack, Tooltip, Typography } from '@mui/material';
// icons
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { Posts } from 'src/types/board.type';

/*게시글 제목(Typography)*/
const PostTitle = styled(Typography)`
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.5; // 줄 간격을 설정 (옵션)
  max-width: 100%;
  max-height: 3em; // 최대 높이를 줄 수에 맞게 설정
  min-height: 3em;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2; // 표시할 줄 수를 설정합니다. 여기서는 2줄로 설정
`;

/*게시글 본문(Typography)*/
const PostBody = styled(Typography)(() => ({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  WebkitLineClamp: 3, // 표시할 줄 수를 설정합니다. 여기서는 2줄로 설정
  lineHeight: '1.5', // 줄 간격을 설정 (옵션)
  maxHeight: '4.5em', // 최대 높이를 줄 수에 맞게 설정
  minHeight: '4.5em'
}));

type PostCardProps = {
  isRight: boolean; // 오른쪽 카드 여부
};

/*게시글 카드(Card)*/
const PostCard = styled(Card, { shouldForwardProp: (prop) => prop !== 'isRight' })<PostCardProps>(({ isRight }) => ({
  variant: 'outlined',
  minHeight: '210px',
  backgroundColor: '#FFF',
  borderLeft: 0,
  ...(isRight && { borderRight: 0 })
}));

type Props = {
  post: Posts;
  isRight: boolean;
  handleClickLike: (postNo: number) => void;
};

export default function PostCardComponent({ post, isRight, handleClickLike }: Props): JSX.Element {
  return (
    <PostCard isRight={isRight}>
      <CardContent>
        {/** 게시물 제목 영역 */}
        <Grid mb={2}>
          <PostTitle variant="subtitle1">
            <Link component={RouterLink} href={`${paths.board.post}/${encodeURIComponent(post.postNo)}`}>
              {post.title}
            </Link>
          </PostTitle>
        </Grid>
        {/** 게시물 본문 영역 */}
        <Grid container justifyContent="start" alignItems="start" mb={4}>
          <Grid size={post.fileUrl ? 9 : 12}>
            <PostBody variant="body2">
              <Link component={RouterLink} href={`${paths.board.post}/${encodeURIComponent(post.postNo)}`}>
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
              <Link component={RouterLink} href={`${paths.board.post}/${encodeURIComponent(post.postNo)}`}>
                <img src={post.fileUrl} width="80px" height="80px" alt="대표이미지" />
              </Link>
            </Grid>
          )}
        </Grid>
        {/** 게시물 카드 하단 영역 */}
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
