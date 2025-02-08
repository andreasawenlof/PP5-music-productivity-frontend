import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { axiosReq } from '../../api/axiosDefaults';
import { useAuth } from '../../contexts/AuthContext';
import styles from './TrackDetails.module.css';
import btnStyles from '../../components/Button.module.css';
import useDeleteTrack from '../../hooks/useDeleteTrack'; // ✅ Import delete hook
import CommentList from '../../components/comments/CommentList';

const TrackDetails = () => {
    const { id } = useParams();
    const [track, setTrack] = useState(null);
    const navigate = useNavigate();
    const { user } = useAuth();

    const handleDelete = useDeleteTrack(() => {
        navigate('/tracks'); // ✅ Redirect immediately after deletion
    });

    useEffect(() => {
        const fetchTrack = async () => {
            try {
                const { data } = await axiosReq.get(`/api/tracks/${id}/`);
                setTrack(data);
            } catch (err) {
                console.error('Error fetching track:', err);
                navigate('/tracks'); // ✅ Redirect if track doesn't exist
            }
        };
        fetchTrack();
    }, [id, navigate]);

    if (!track) return <p>Loading...</p>;

    const isComposer = user?.is_composer;
    const isReviewer = user?.is_reviewer;

    return (
        <div className={styles.trackDetailsContainer}>
            <h2 className={styles.trackTitle}>{track.title}</h2>

            <p className={styles.trackMeta}>
                {track?.album_name || 'No Album'}
            </p>
            <p className={styles.trackMeta}>
                {track?.genre_name || 'No Genre'} |{' '}
                {track?.mood_name || 'No Mood'}
            </p>

            <p className={styles.trackInfo}>
                <strong>Status:</strong>{' '}
                <span className={styles.trackStatus}>
                    {track.status_display || track.status}
                </span>
            </p>
            {isComposer && (
                <>
                    <div className={styles.buttonsContainer}>
                        <span>
                            <button
                                className={btnStyles.editTwo}
                                onClick={() =>
                                    navigate(`/tracks/${track.id}/edit`)
                                }
                            >
                                Edit
                            </button>
                        </span>
                        &nbsp;&nbsp;
                        <span>
                            <button
                                className={btnStyles.delete}
                                size='sm'
                                onClick={() => handleDelete(track.id)} // ✅ Delete and redirect
                            >
                                Delete
                            </button>
                        </span>
                    </div>
                    <CommentList trackId={track.id} />
                </>
            )}
        </div>
    );
};

export default TrackDetails;
