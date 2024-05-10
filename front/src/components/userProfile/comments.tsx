import React, { useState, useEffect, useCallback } from 'react';
import { CommentInterface } from '../../interfaces/comments';
import {
  createComment,
  deleteComment,
  getCommentsByNft,
} from '../../api/comments';
import '../../scss/components/userProfile/comments.scss';

interface CommentSectionProps {
  nftId: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ nftId }) => {
  const [comments, setComments] = useState<CommentInterface[]>([]);
  const [newComment, setNewComment] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const fetchComments = useCallback(async () => {
    try {
      const fetchedComments = await getCommentsByNft(nftId);
      setComments(fetchedComments);
    } catch (fetchError) {
      setError('Error fetching comments.');
    }
  }, [nftId]);

  const handleCreateComment = async () => {
    if (newComment.trim() === '') {
      return;
    }

    const commentData: CommentInterface = {
      userId: 'user-id-placeholder',
      nftId,
      content: newComment,
    };

    try {
      await createComment(commentData);
      setNewComment('');
      setComments([...comments, commentData]);
    } catch (createError) {
      setError('Failed to create comment.');
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      await deleteComment(commentId);
      setComments(comments.filter((comment) => comment.id !== commentId));
    } catch (deleteError) {
      setError('Failed to delete comment.');
    }
  };

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

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
            <button onClick={() => handleDeleteComment(comment.id!)}>
              {' '}
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
      <button onClick={handleCreateComment}>Comment</button>
    </div>
  );
};

export default CommentSection;
