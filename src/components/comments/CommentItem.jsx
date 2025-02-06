import PropTypes from 'prop-types';
import { commentPropType } from '../../propTypes/commentPropTypes';
import { useState } from 'react';
import { axiosRes } from '../../api/axiosDefaults';
import { useAuth } from '../../contexts/AuthContext';
import styles from './CommentItem.module.css';
import btnStyles from '../../components/Button.module.css';
import { Link } from 'react-router-dom';

const CommentItem = ({ comment, setComments }) => {
    const { user } = useAuth();

    const isOwner = comment.owner === user.username;

    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState(comment.content);
    const [error, setError] = useState(null);

    /** ✅ Handle Delete */
    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this comment?')) {
            try {
                await axiosRes.delete(`/api/comments/${comment.id}/`);
                setComments((prev) => prev.filter((c) => c.id !== comment.id));
            } catch (err) {
                console.error('❌ Error deleting comment:', err);
                setError('Failed to delete comment.');
            }
        }
    };

    /** ✅ Handle Edit */
    const handleEdit = async (e) => {
        e.preventDefault();
        if (!editContent.trim()) return;
        try {
            const { data } = await axiosRes.patch(
                `/api/comments/${comment.id}/`,
                {
                    content: editContent,
                }
            );
            setComments((prev) =>
                prev.map((c) =>
                    c.id === comment.id ? { ...c, content: data.content } : c
                )
            );
            setIsEditing(false);
        } catch (err) {
            console.error('❌ Error editing comment:', err);
            setError('Failed to edit comment.');
        }
    };

    return (
        <div className={styles.commentItem}>
            <Link to={`/profiles/${user.profile_id}`}>
                <img
                    src={comment.profile_image}
                    alt='avatar'
                    className={styles.avatar}
                />
            </Link>
            <div className={styles.commentContent}>
                <Link
                    className={styles.commentAuthor}
                    to={`/profiles/${user.profile_id}`}
                >
                    <strong>{comment.owner}</strong>
                </Link>
                {isEditing ? (
                    <form
                        onSubmit={handleEdit}
                        className={btnStyles.edit}
                    >
                        <textarea
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                            required
                        />
                        <button
                            type='submit'
                            className={btnStyles.edit}
                        >
                            Save
                        </button>
                        <button
                            type='button'
                            onClick={() => setIsEditing(false)}
                            className={styles.cancelButton}
                        >
                            Cancel
                        </button>
                    </form>
                ) : (
                    <p>{comment.content}</p>
                )}
                {isOwner && (
                    <div className={styles.commentActions}>
                        {!isEditing && (
                            <button
                                onClick={() => setIsEditing(true)}
                                className={`${btnStyles.commentEdit}`}
                            >
                                Edit
                            </button>
                        )}
                        &nbsp;&nbsp;
                        <button
                            onClick={handleDelete}
                            className={btnStyles.commentDelete}
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

CommentItem.propTypes = {
    comment: commentPropType.isRequired,
    setComments: PropTypes.func.isRequired,
};

export default CommentItem;
