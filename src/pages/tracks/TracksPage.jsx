// src/pages/TracksPage.jsx
import { useEffect, useState } from 'react';
import { axiosReq } from '../api/axiosDefaults';
import TrackCard from '../components/TrackCard';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';

function TracksPage() {
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

    return (
        <Container>
            <h2 className='my-4 text-center'>🎵 Available Tracks</h2>
            {loading && (
                <Spinner
                    animation='border'
                    className='d-block mx-auto'
                />
            )}
            {error && <Alert variant='danger'>{error}</Alert>}
            <Row>
                {tracks.map((track) => (
                    <Col
                        key={track.id}
                        md={6}
                        lg={4}
                        className='mb-4'
                    >
                        <TrackCard track={track} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default TracksPage;

// 🚀 This page fetches tracks, shows them in Bootstrap cards, and handles errors/loading.
