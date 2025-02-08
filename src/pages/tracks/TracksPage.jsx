import { useEffect, useState } from 'react';
import { axiosReq } from '../../api/axiosDefaults';
import TrackCard from './TrackCard';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import styles from './TracksPage.module.css';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const TracksPage = () => {
    const navigate = useNavigate();
    const [tracks, setTracks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth();
    const isComposer = user?.is_composer;
    const isReviewer = user?.is_reviewer;

    useEffect(() => {
        // 🚀 STEP 1: Handle Unauthorized Access *Before* Rendering
        if (user === undefined) return; // 🔄 Wait for auth state
        if (!user) return navigate('/login'); // 🔄 Redirect if NOT logged in
        if (!isReviewer && !isComposer) return navigate('/404'); // 🔄 Redirect if user has no access

        // 🚀 STEP 2: Fetch tracks only if user is authorized
        const fetchTracks = async () => {
            try {
                const response = await axiosReq.get('/api/tracks/');
                setTracks(response.data);
            } catch (err) {
                setError('No tracks Available');
            } finally {
                setLoading(false);
            }
        };
        fetchTracks();
    }, [user, isReviewer, isComposer, navigate]);

    // 🚀 STEP 3: Prevent rendering if still waiting for user state
    if (user === undefined) return null;

    return (
        <Container className={styles.tracksPageContainer}>
            <h2 className='my-4 mt-5 mb-5 text-center'>
                {isReviewer ? '🎵 Pending Tracks' : '🎵 Available Tracks'}
            </h2>
            {loading && (
                <Spinner
                    animation='border'
                    className='d-block mx-auto'
                />
            )}
            {error && <Alert variant='danger'>{error}</Alert>}
            <div className={styles.trackList}>
                {tracks.length ? (
                    tracks.map((track) => (
                        <div
                            key={track.id}
                            className={styles.trackCard}
                        >
                            <TrackCard
                                track={track}
                                setTracks={setTracks}
                                tracks={tracks}
                            />
                        </div>
                    ))
                ) : (
                    <Alert
                        variant='danger'
                        className='text-center'
                    >
                        No tracks available.
                    </Alert>
                )}
            </div>
        </Container>
    );
};

export default TracksPage;
