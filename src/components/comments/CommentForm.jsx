import { useState, useEffect } from 'react';
import { axiosRes } from '../../api/axiosDefaults';
import styles from './CommentForm.module.css';
import PropTypes from 'prop-types';
import btnStyles from '../../components/Button.module.css';

const CommentForm = ({
    trackId,
    setComments,
    editingComment,
    setEditingComment,
}) => {
    const [content, setContent] = useState(
        editingComment ? editingComment.content : ''
    );
    const [error, setError] = useState(null);

    useEffect(() => {
        if (editingComment) {
            setContent(editingComment.content); // Pre-populate with editing comment content
        }
    }, [editingComment]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!content.trim()) return;

        console.log('Submitting update:', {
            content,
            track: trackId || editingComment.track,
        });

        try {
            if (editingComment) {
                const { data } = await axiosRes.patch(
                    `/api/comments/${editingComment.id}/`,
                    {
                        content,
                        track: trackId || editingComment.track, // Ensure track ID is included
                        album: editingComment.album, // Ensure album ID is included
                    }
                );

                console.log('Response from backend:', data);

                setComments((prev) =>
                    prev.map(
                        (comment) =>
                            comment.id === editingComment.id ? data : comment // ✅ Update entire object
                    )
                );

                setTimeout(() => {
                    console.log('Exiting edit mode...');
                    setEditingComment(null);
                }, 100); // Small delay to ensure UI updates before exiting edit mode
            } else {
                const { data } = await axiosRes.post('/api/comments/', {
                    content,
                    track: trackId,
                });
                setComments((prev) => [data, ...prev]);
            }

            setContent('');
        } catch (err) {
            setError('Failed to post comment.');
            console.error(
                'Error posting/updating comment:',
                err.response?.data || err
            );
        }
    };

    const handleCancel = () => {
        setEditingComment(null); // Reset to prevent unexpected UI behavior
        setContent('');
    };

    return (
        <form
            onSubmit={handleSubmit}
            className={styles.commentForm}
        >
            {error && <p className={styles.error}>{error}</p>}
            <textarea
                className={styles.commentInput}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder='Write a comment...'
                required
            />
            <button
                className={btnStyles.postButton}
                type='submit'
            >
                {editingComment ? 'Update' : 'Post'}
            </button>
            {editingComment && (
                <button
                    type='button'
                    onClick={handleCancel}
                    className={`${btnStyles.btn} ${btnStyles.tracksBtn} rounded mt-2 me-auto `}
                >
                    Cancel
                </button>
            )}
        </form>
    );
};

CommentForm.propTypes = {
    trackId: PropTypes.number.isRequired,
    setComments: PropTypes.func.isRequired,
    editingComment: PropTypes.object,
    setEditingComment: PropTypes.func.isRequired,
};

export default CommentForm;
