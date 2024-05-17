import axios from 'axios';

export interface CommentInterface {
  id: number;
  userId: string;
  nftId: string;
  content: string;
  timestamp?: string;
}

export const getCommentsByNft = async (nftId: string) =>
  await axios
    .get(`${import.meta.env.VITE_API_URL}/comments/${nftId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.data)
    .catch((error) => error);

export const createComment = async (commentData: CommentInterface) =>
  await axios
    .post(`${import.meta.env.VITE_API_URL}/comments/create`, commentData, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    })
    .then((response) => response.data)
    .catch((error) => error);
export const deleteComment = async (commentId: number) => {
  await axios
    .delete(`${import.meta.env.VITE_API_URL}/comments/${commentId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.data)
    .catch((error) => error);
};
