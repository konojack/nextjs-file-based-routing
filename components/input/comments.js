import { useEffect, useState } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';

function Comments({ eventId }) {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (showComments) {
      fetch(`/api/comments/${eventId}`)
        .then(resp => resp.json())
        .then(resp => {
          setComments(resp.comments);
        });
    }
  }, [showComments, eventId]);

  function toggleCommentsHandler() {
    setShowComments(prevStatus => !prevStatus);
  }

  function addCommentHandler(commentData) {
    fetch(`/api/comments/${eventId}`, {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(resp => resp.json())
      .then(resp => console.log(resp));
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList comments={comments} />}
    </section>
  );
}

export default Comments;
