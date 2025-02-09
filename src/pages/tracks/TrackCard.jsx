import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import styles from './TrackCard.module.css';
import btnStyles from '../../components/Button.module.css';
import { trackPropType } from '../../propTypes/trackPropTypes';
import useDeleteTrack from '../../hooks/useDeleteTrack';

const TrackCard = ({ track, setTracks }) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const isOwner = track.owner === user.username;
    const isComposer = user?.is_composer;
    const isReviewer = user?.is_reviewer;

    const handleDelete = useDeleteTrack(setTracks); // ✅ Using the hook

    return (
        <Card
            className={`mb-2 ${styles.trackCard} ${styles.clickable}`}
            onClick={() => navigate(`/tracks/${track.id}`)}
        >
            <Card.Body>
                <div className='d-flex justify-content-between flex-wrap'>
                    <div>
                        <Card.Title>{track.title}</Card.Title>
                        <Card.Text>{track?.album_name || 'No Album'}</Card.Text>
                        <Card.Subtitle className='mb-2'>
                            {track?.genre_name || 'No Genre'} |{' '}
                            {track?.mood_name || 'No Mood'}
                        </Card.Subtitle>
                        <Card.Text>
                            <strong>Status:</strong>{' '}
                            {track.status_display || track.status}
                        </Card.Text>
                        {track.vocals_needed && (
                            <Card.Text>
                                🎤 <strong>Vocals Needed:</strong>{' '}
                                {track.vocals_status}
                            </Card.Text>
                        )}
                        <Card.Text>
                            <strong>Project Type:</strong>{' '}
                            {track?.project_type_name || 'No Project Type'}
                        </Card.Text>
                        <Card.Subtitle className='mb-2 mt-2'>
                            (
                            {track?.instrument_names?.join(', ') ||
                                'No Instruments yet'}
                            )
                        </Card.Subtitle>
                        <Card.Text>
                            🗓️ <strong>Added:</strong>{' '}
                            {new Date(track.created_at).toLocaleDateString()}
                        </Card.Text>
                    </div>
                    {isComposer && (
                        <div className='d-flex flex-column'>
                            <Button
                                size='sm'
                                className={btnStyles.postButton}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    navigate(`/tracks/${track.id}/edit`);
                                }}
                            >
                                Edit
                            </Button>
                            <Button
                                className={btnStyles.delete}
                                size='sm'
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(track.id); // ✅ Calls the hook function
                                }}
                            >
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
            </Card.Body>
        </Card>
    );
};

TrackCard.propTypes = {
    track: trackPropType.isRequired,
};

export default TrackCard;
