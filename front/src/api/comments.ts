import { CommentInterface } from '../interfaces/comments';

const BAD_REQUEST = 400;

export const createComment = async (commentData: CommentInterface) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(commentData),
  });

  return response;
};

export const updateComment = async (commentData: CommentInterface) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/comments/${commentData.id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(commentData),
    },
  );

  return response;
};

export const deleteComment = async (commentId: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/comments/${commentId}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    },
  );

  return response;
};

export const getCommentsByNft = async (nftId: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/comments/nft/${nftId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    },
  );

  if (response.status === BAD_REQUEST) {
    return response.status;
  }

  return await response.json();
};
