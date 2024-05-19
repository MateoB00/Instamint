import React, { useState } from 'react';
import { CommentInterface, createComment } from '../../api/comments';
import '../../scss/components/userProfile/comments.scss';

interface CommentSectionProps {
  nftId: string;
}

const handleCreateComment = async (
  newComment: string,
  nftId: string,
  setNewComment: React.Dispatch<React.SetStateAction<string>>,
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
    await createComment(commentData);
    setNewComment('');
  } catch (createError) {
    setError('Failed to create comment');
  }
};

const CommentSection: React.FC<CommentSectionProps> = ({ nftId }) => {
  const [newComment, setNewComment] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="commentSection">
      <h3>Comments</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Add a comment..."
      />
      <button
        onClick={() =>
          handleCreateComment(newComment, nftId, setNewComment, setError)
        }
      >
        Comment
      </button>
    </div>
  );
};

export default CommentSection;
