import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import styles from './TrackCard.module.css'; // ✅ Corrected Import
import { trackPropType } from '../../propTypes/trackPropTypes';

const TrackCard = ({ track }) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const isOwner = user && user.pk === track.assigned_composer;

    return (
        <Card
            className={`mb-2 ${styles.trackCard} ${styles.clickable}`}
            onClick={() => navigate(`/tracks/${track.id}`)}
        >
            <Card.Body>
                <div className='d-flex justify-content-between'>
                    <div>
                        <Card.Title>{track.title}</Card.Title>
                        <Card.Text>{track?.album_name || 'No Album'}</Card.Text>
                        <Card.Subtitle className='mb-2 text-muted'>
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
                        <Card.Subtitle className='mb-2 text-muted'>
                            Instruments:{' '}
                            {track?.instrument_names?.join(', ') ||
                                'No Instruments yet'}
                        </Card.Subtitle>
                        <Card.Text>
                            🗓️ <strong>Added:</strong>{' '}
                            {new Date(track.created_at).toLocaleDateString()}
                        </Card.Text>
                    </div>
                    {isOwner && (
                        <div className='d-flex flex-column'>
                            <Button
                                variant='primary'
                                size='sm'
                                className='mb-1'
                                onClick={(e) => {
                                    e.stopPropagation();
                                    navigate(`/tracks/edit/${track.id}`);
                                }}
                            >
                                Edit
                            </Button>
                            <Button
                                variant='danger'
                                size='sm'
                                onClick={(e) => {
                                    e.stopPropagation();
                                    console.log('Delete track');
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
