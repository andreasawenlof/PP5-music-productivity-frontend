import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { axiosReq } from '../../api/axiosDefaults';
import { useAuth } from '../../contexts/AuthContext';
import styles from './TrackDetails.module.css';
import btnStyles from '../../components/Button.module.css';
import useDeleteTrack from '../../hooks/useDeleteTrack'; // ✅ Import delete hook

const TrackDetails = () => {
    const { id } = useParams();
    const [track, setTrack] = useState(null);
    const navigate = useNavigate();
    const { user } = useAuth();
    const handleDelete = useDeleteTrack(); // ✅ Use delete hook

    useEffect(() => {
        const fetchTrack = async () => {
            try {
                const { data } = await axiosReq.get(`/api/tracks/${id}/`);
                setTrack(data);
            } catch (err) {
                console.error('Error fetching track:', err);
            }
        };
        fetchTrack();
    }, [id]);

    if (!track) return <p>Loading...</p>;

    const isOwner = user && user.pk === track.assigned_composer;

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

            {isOwner && (
                <div className={styles.buttonsContainer}>
                    <button
                        className={btnStyles.edit}
                        onClick={() => navigate(`/tracks/${track.id}/edit`)}
                    >
                        Edit
                    </button>
                    <button
                        className={btnStyles.delete}
                        onClick={() => handleDelete(track.id)} // ✅ Pass the track.id
                    >
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
};

export default TrackDetails;
