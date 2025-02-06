// src/pages/TracksPage.jsx
import { useEffect, useState } from 'react';
import { axiosReq } from '../../api/axiosDefaults';
import TrackCard from './TrackCard';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import styles from './TracksPage.module.css'; // ✅ CSS Import

const TracksPage = () => {
    const [tracks, setTracks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTracks = async () => {
            try {
                const response = await axiosReq.get('/api/tracks/');
                setTracks(response.data);
            } catch (err) {
                setError('Failed to load tracks. Please try again.');
            } finally {
                setLoading(false);
            }
        };
        fetchTracks();
    }, []);

    // ✅ Pass setTracks into TrackCard so it can remove deleted tracks
    return (
        <Container className={styles.tracksPageContainer}>
            <h2 className='my-4 mt-5 mb-5 text-center'>🎵 Available Tracks</h2>
            {loading && (
                <Spinner
                    animation='border'
                    className='d-block mx-auto'
                />
            )}
            {error && <Alert variant='danger'>{error}</Alert>}
            <div className={styles.trackList}>
                {tracks.map((track) => (
                    <div
                        key={track.id}
                        className={styles.trackCard}
                    >
                        <TrackCard
                            track={track}
                            setTracks={setTracks} // ✅ THIS WAS MISSING!
                            tracks={tracks} // ✅ Pass current tracks so we can filter on delete
                        />
                    </div>
                ))}
            </div>
        </Container>
    );
};

export default TracksPage;
