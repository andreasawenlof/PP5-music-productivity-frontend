import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { axiosReq, axiosRes } from '../../api/axiosDefaults';
import { useAuth } from '../../contexts/AuthContext';
import styles from './TrackDetails.module.css'; // ✅ Corrected Import

const TrackDetails = () => {
    const { id } = useParams();
    const [track, setTrack] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState('');
    const { user } = useAuth();

    useEffect(() => {
        const fetchTrack = async () => {
            try {
                const { data } = await axiosReq.get(`/api/tracks/${id}/`);
                setTrack(data);
                setEditedTitle(data.title);
            } catch (err) {
                console.error('Error fetching track:', err);
            }
        };
        fetchTrack();
    }, [id]);

    if (!track) return <p>Loading...</p>;

    const isOwner = user && user.pk === track.assigned_composer;

    const toggleEdit = () => {
        setIsEditing((prev) => !prev);
    };

    const handleSave = async () => {
        try {
            const { data } = await axiosRes.put(`/api/tracks/${id}/`, {
                title: editedTitle,
            });
            setTrack(data);
            setIsEditing(false);
        } catch (err) {
            console.error('Error updating track:', err);
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this track?')) {
            try {
                await axiosRes.delete(`/api/tracks/${id}/`);
                alert('Track deleted successfully!');
                window.location.href = '/tracks';
            } catch (err) {
                console.error('Error deleting track:', err);
            }
        }
    };

    return (
        <div className={styles.trackDetailsContainer}>
            {isEditing ? (
                <input
                    type='text'
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    className={styles.editInput}
                />
            ) : (
                <h2 className={styles.trackTitle}>{track.title}</h2>
            )}

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
                    {isEditing ? (
                        <button
                            className={styles.edit}
                            onClick={handleSave}
                        >
                            Save
                        </button>
                    ) : (
                        <button
                            className={styles.edit}
                            onClick={toggleEdit}
                        >
                            Edit
                        </button>
                    )}
                    <button
                        className={styles.delete}
                        onClick={handleDelete}
                    >
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
};

export default TrackDetails;
