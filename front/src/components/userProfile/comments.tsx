import React, { useState, useEffect, useCallback } from 'react';
import {
  CommentInterface,
  createComment,
  deleteComment,
  getCommentsByNft,
} from '../../api/comments';
import '../../scss/components/userProfile/comments.scss';

interface CommentSectionProps {
  nftId: string;
}

const formatDates = (comments: CommentInterface[]): CommentInterface[] =>
  comments.map((comment) => ({
    ...comment,
    timestamp: new Date(comment.timestamp || '').toLocaleString(),
  }));

function useComments(nftId: string) {
  const [comments, setComments] = useState<CommentInterface[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchComments = useCallback(async () => {
    try {
      const fetchedComments = await getCommentsByNft(nftId);
      const formattedComments = formatDates(fetchedComments);
      setComments(formattedComments);
    } catch (fetchError) {
      setError('Error fetching comments');
    }
  }, [nftId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  return { comments, setComments, error, setError, fetchComments };
}

const handleCreateComment = async (
  newComment: string,
  nftId: string,
  setNewComment: React.Dispatch<React.SetStateAction<string>>,
  setComments: React.Dispatch<React.SetStateAction<CommentInterface[]>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
) => {
  if (!newComment.trim()) {
    return;
  }

  const commentData: CommentInterface = {
    userId: 'user-id-placeholder',
    nftId,
    content: newComment,
    id: Math.random(),
  };

  try {
    const newCommentData = await createComment(commentData);
    setNewComment('');
    setComments((prevComments) => [...prevComments, newCommentData]);
  } catch (createError) {
    setError('Failed to create comment');
  }
};

const handleDeleteComment = async (
  commentId: number,
  setComments: React.Dispatch<React.SetStateAction<CommentInterface[]>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  comments: CommentInterface[],
) => {
  try {
    await deleteComment(commentId);
    setComments(comments.filter((comment) => comment.id !== commentId));
  } catch (deleteError) {
    setError('Failed to delete comment');
  }
};

const CommentSection: React.FC<CommentSectionProps> = ({ nftId }) => {
  const { comments, setComments, error, setError } = useComments(nftId);
  const [newComment, setNewComment] = useState<string>('');

  return (
    <div className="commentSection">
      <h3>Comments</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <h3>{comment.userId}</h3>
            <p>{comment.content}</p>
            <div>{comment.timestamp}</div>
            <button
              onClick={() =>
                handleDeleteComment(comment.id, setComments, setError, comments)
              }
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Add a comment..."
      />
      <button
        onClick={() =>
          handleCreateComment(
            newComment,
            nftId,
            setNewComment,
            setComments,
            setError,
          )
        }
      >
        Comment
      </button>
    </div>
  );
};

export default CommentSection;
