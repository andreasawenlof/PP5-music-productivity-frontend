import { useState } from 'react';
import { axiosRes } from '../../api/axiosDefaults';
import styles from './CommentForm.module.css';
import PropTypes from 'prop-types';
import btnStyles from '../../components/Button.module.css';

const CommentForm = ({ trackId, setComments }) => {
    const [content, setContent] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!content.trim()) return;

        try {
            const { data } = await axiosRes.post('/api/comments/', {
                content,
                track: trackId, // ✅ Ensure trackId is sent properly
            });

            setComments((prev) => [data, ...prev]); // ✅ Add new comment to list
            setContent('');
        } catch (err) {
            setError('Failed to post comment.');
            console.error('Error posting comment:', err.response?.data || err);
        }
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
                Post
            </button>
        </form>
    );
};

CommentForm.propTypes = {
    trackId: PropTypes.number.isRequired,
    setComments: PropTypes.func.isRequired,
};

export default CommentForm;
