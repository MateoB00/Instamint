import axios from 'axios';

export interface CommentInterface {
  id: number;
  userId: string;
  nftId: string;
  content: string;
  timestamp?: string;
}

export const getCommentsByNft = async (nftId: string) => {
  const response = await axios.get(`/api/comments/${nftId}`);
  if (response.status === 200) {
    return response.data as CommentInterface[];
  }
  throw new Error('Failed to fetch comments');
};

export const createComment = async (commentData: CommentInterface) => {
  const response = await axios.post('/api/comments', commentData);

  return response.data;
};

export const deleteComment = async (commentId: number) => {
  const response = await axios.delete(`/api/comments/${commentId}`);

  return response.data;
};
