import PropTypes from 'prop-types';
import { commentPropType } from '../../propTypes/commentPropTypes';
import { useState } from 'react';
import { axiosRes } from '../../api/axiosDefaults';
import { useAuth } from '../../contexts/AuthContext';
import styles from './CommentItem.module.css';

const CommentItem = ({ comment, setComments }) => {
    const { user } = useAuth();
    const isOwner = user && user.username === comment.owner;

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
            <img
                src={comment.profile_image}
                alt='avatar'
                className={styles.avatar}
            />
            <div className={styles.commentContent}>
                <strong>{comment.owner}</strong>
                {isEditing ? (
                    <form
                        onSubmit={handleEdit}
                        className={styles.editForm}
                    >
                        <textarea
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                            required
                        />
                        <button
                            type='submit'
                            className={styles.saveButton}
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
                                className={styles.editButton}
                            >
                                ✏️ Edit
                            </button>
                        )}
                        <button
                            onClick={handleDelete}
                            className={styles.deleteButton}
                        >
                            🗑️ Delete
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
