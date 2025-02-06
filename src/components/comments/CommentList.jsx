import { useEffect, useState } from 'react';
import { axiosReq } from '../../api/axiosDefaults';
import CommentItem from './CommentItem';
import CommentForm from './CommentForm';
import styles from './CommentList.module.css';
import PropTypes from 'prop-types';

const CommentList = ({ trackId }) => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const { data } = await axiosReq.get(`/api/comments/`, {
                    params: { track: trackId }, // ✅ Proper filtering
                });
                setComments(data);
            } catch (err) {
                console.error('Error fetching comments:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchComments();
    }, [trackId]);

    return (
        <div className={styles.commentSection}>
            <h3>💬 Comments</h3>
            <CommentForm
                trackId={trackId}
                setComments={setComments}
            />
            {loading ? (
                <p>Loading comments...</p>
            ) : comments.length > 0 ? (
                comments.map((comment) => (
                    <CommentItem
                        key={comment.id}
                        comment={comment}
                        setComments={setComments}
                    />
                ))
            ) : (
                <p>No comments yet. Be the first to comment!</p>
            )}
        </div>
    );
};

CommentList.propTypes = {
    trackId: PropTypes.number.isRequired,
};

export default CommentList;
