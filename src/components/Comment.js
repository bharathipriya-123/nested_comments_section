
import React, { useState } from "react";
import "../style/Comment.css";

const CommentSection = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const addComment = () => {
    if (!newComment.trim()) return;
    setComments([...comments, {text: newComment, replies: [] }]);
    setNewComment("");
  };

  const addReply = (commentId, replyText) => {
    if (!replyText.trim()) return;
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === commentId
          ? { ...comment, replies: [...comment.replies, { text: replyText }] }
          : comment
      )
    );
  };

  const editComment = (commentId, newText) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === commentId ? { ...comment, text: newText } : comment
      )
    );
  };

  const deleteComment = (commentId) => {
    setComments((prevComments) => prevComments.filter((comment) => comment.id !== commentId));
  };

  const editReply = (commentId, replyId, newText) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              replies: comment.replies.map((reply) =>
                reply.id === replyId ? { ...reply, text: newText } : reply
              ),
            }
          : comment
      )
    );
  };

  const deleteReply = (commentId, replyId) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              replies: comment.replies.filter((reply) => reply.id !== replyId),
            }
          : comment
      )
    );
  };

  const Comment = ({ comment }) => {
    const [replyText, setReplyText] = useState("");
    const [isEditingComment, setIsEditingComment] = useState(false);
    const [editedCommentText, setEditedCommentText] = useState(comment.text);

    return (
      <div className="comment-container">
        {isEditingComment ? (
          <div className="edit-container">
            <input
              type="text"
              value={editedCommentText}
              onChange={(e) => setEditedCommentText(e.target.value)}
            />
            <button
              onClick={() => {
                editComment(comment.id, editedCommentText);
                setIsEditingComment(false);
              }}
            >
              Save
            </button>
            <button onClick={() => setIsEditingComment(false)}>Cancel</button>
          </div>
        ) : (
          <div className="comment-content">
            <p className="comment-text">{comment.text}</p>
            <button onClick={() => setIsEditingComment(true)}>Edit</button>
            <button onClick={() => deleteComment(comment.id)}>Delete</button>
          </div>
        )}

        <div className="reply-input-container">
          <input
            type="text"
            className="reply-input"
            placeholder="Reply..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          />
          <button
            className="reply-button"
            onClick={() => {
              addReply(comment.id, replyText);
              setReplyText("");
            }}
          >
            Reply
          </button>
        </div>
        <div className="replies-container">
          {comment.replies.map((reply) => (
            <Reply
              key={reply.id}
              reply={reply}
              commentId={comment.id}
              editReply={editReply}
              deleteReply={deleteReply}
            />
          ))}
        </div>
      </div>
    );
  };

  const Reply = ({ reply, commentId, editReply, deleteReply }) => {
    const [isEditingReply, setIsEditingReply] = useState(false);
    const [editedReplyText, setEditedReplyText] = useState(reply.text);

    return (
      <div className="reply-container">
        {isEditingReply ? (
          <div className="edit-container">
            <input
              type="text"
              value={editedReplyText}
              onChange={(e) => setEditedReplyText(e.target.value)}
            />
            <button
              onClick={() => {
                editReply(commentId, reply.id, editedReplyText);
                setIsEditingReply(false);
              }}
            >
              Save
            </button>
            <button onClick={() => setIsEditingReply(false)}>Cancel</button>
          </div>
        ) : (
          <div className="reply-content">
            <p className="reply-text">{reply.text}</p>
            <button onClick={() => setIsEditingReply(true)}>Edit</button>
            <button onClick={() => deleteReply(commentId, reply.id)}>Delete</button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="comment-section">
      <h2>Comments</h2>
      <div className="comment-input-container">
        <input
          type="text"
          className="comment-input"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button className="comment-button" onClick={addComment}>
          Comment
        </button>
      </div>
      <div className="comments-list">
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default CommentSection;

