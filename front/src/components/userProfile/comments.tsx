import { Fragment, useState, useEffect, useCallback } from 'react';
import Button from '../ui/Button';
import { Message } from '../ui/Message';

interface CommentInterface {
  id: number;
  content: string;
  author: string;
  createdAt: string;
}

interface Props {
  postId: number | string;
}

const Comments = ({ postId }: Props) => {
  const [comments, setComments] = useState<CommentInterface[]>([]);
  const [page, setPage] = useState(1);
  const pageSize = 20;
  const [errorMessage, setErrorMessage] = useState('');

  // Use useCallback to memoize loadComments
  const loadComments = useCallback(async () => {
    try {
      const response = await fetch(
        `/api/comments/${postId}?page=${page}&pageSize=${pageSize}`,
      );
      if (!response.ok) {
        throw new Error('Failed to load comments.');
      }
      const newComments: CommentInterface[] = await response.json();
      setComments((prev) => [...prev, ...newComments]);
    } catch (error) {
      setErrorMessage((error as Error).message);
    }
  }, [postId, page, pageSize]);

  useEffect(() => {
    loadComments();
  }, [loadComments]);

  return (
    <div className="commentsSection">
      <h1>Comments</h1>
      {comments.length === 0 && !errorMessage && (
        <Message message="No comments yet" color="red" />
      )}
      {errorMessage && <Message message={errorMessage} color="red" />}
      {comments.map((comment) => (
        <Fragment key={comment.id}>
          <div className="comment">
            <h3>{comment.author}</h3>
            <p>{comment.content}</p>
            <small>{new Date(comment.createdAt).toLocaleString()}</small>
          </div>
        </Fragment>
      ))}
      <Button onClick={() => setPage(page + 1)} children="Show more comments" />
    </div>
  );
};

export default Comments;
