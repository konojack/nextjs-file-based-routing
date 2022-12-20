import { useCallback, useContext, useEffect, useState } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';
import Image from 'next/image';
import { NotificationContext } from '../../store/notification-context';

function Comments({ eventId }) {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);

  const notificationCtx = useContext(NotificationContext);

  const getComments = useCallback(() => {
    setLoadingComments(true);
    fetch(`/api/comments/${eventId}`)
      .then(resp => resp.json())
      .then(resp => {
        setComments(resp.comments);
        setLoadingComments(false);
      });
  }, [eventId]);

  useEffect(() => {
    if (showComments) {
      getComments();
    }
  }, [showComments, eventId, getComments]);

  function toggleCommentsHandler() {
    setShowComments(prevStatus => !prevStatus);
  }

  function addCommentHandler(commentData) {
    notificationCtx.showNotification({
      title: 'Sending...',
      message: 'Your comment is saving',
      status: 'pending',
    });

    fetch(`/api/comments/${eventId}`, {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(resp => {
        if (resp.ok) {
          return resp.json();
        }

        return resp.json().then(resp => {
          throw new Error(resp.message || 'Something went wrong!');
        });
      })
      .then(resp => {
        notificationCtx.showNotification({
          title: 'Success!',
          message: 'Your comment has been saved',
          status: 'success',
        });

        getComments();
      })
      .catch(err => {
        notificationCtx.showNotification({
          title: 'Error!',
          message: err.message || 'Something went wrong!',
          status: 'error',
        });
      });
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && loadingComments && (
        <Image
          src="/spinner.svg"
          className={classes.spinner}
          alt="vercel"
          height="100"
          width="100"
        />
      )}
      {showComments && !loadingComments && <CommentList comments={comments} />}
    </section>
  );
}

export default Comments;
