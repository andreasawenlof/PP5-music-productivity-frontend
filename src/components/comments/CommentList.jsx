import { useEffect, useState } from 'react';
import { axiosReq } from '../../api/axiosDefaults';
import CommentItem from './CommentItem';
import CommentForm from './CommentForm';
import styles from './CommentList.module.css';
import PropTypes from 'prop-types';

const CommentList = ({ trackId }) => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingComment, setEditingComment] = useState(null); // State for the comment being edited

    // Fetching comments and ensuring the correct track data is available
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const { data } = await axiosReq.get(`/api/comments/`, {
                    params: { track: trackId }, // Fetching comments for the current track
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
                editingComment={editingComment} // Pass editingComment to CommentForm
                setEditingComment={setEditingComment} // Pass setEditingComment to reset the state after edit
            />
            {loading ? (
                <p>Loading comments...</p>
            ) : comments.length > 0 ? (
                comments.map((comment) => (
                    <CommentItem
                        key={comment.id}
                        comment={comment}
                        setComments={setComments}
                        setEditingComment={setEditingComment} // Pass setEditingComment
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
