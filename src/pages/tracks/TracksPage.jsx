import { useEffect, useState, useActionState } from 'react';
import { axiosReq } from '../../api/axiosDefaults';
import TrackCard from './TrackCard';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import styles from './TracksPage.module.css';
import { useAuth } from '../../contexts/AuthContext';
import { Form, Row, Col } from 'react-bootstrap';
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
        if (user === undefined) return;
        if (!user) return navigate('/login');
        if (!isReviewer && !isComposer) return navigate('/404');

        fetchTracks();
    }, [user, isReviewer, isComposer, navigate]);

    const fetchTracks = async () => {
        try {
            const response = await axiosReq.get('/api/tracks/');
            setTracks(response.data);
        } catch (err) {
            setError('No tracks available');
        } finally {
            setLoading(false);
        }
    };

    // ✅ `useActionState` for Search & Filters
    const [filters, setFilters] = useActionState(
        (prev, event) => {
            return { ...prev, [event.target.name]: event.target.value };
        },
        {
            search: '',
            genre: '',
            mood: '',
            status: '',
            projectType: '',
            vocalsNeeded: '',
        }
    );

    // ✅ Apply filtering logic
    const filteredTracks = tracks.filter(
        (track) =>
            track.title.toLowerCase().includes(filters.search.toLowerCase()) &&
            (filters.genre === '' || track.genre_name === filters.genre) &&
            (filters.mood === '' || track.mood_name === filters.mood) &&
            (filters.status === '' || track.status === filters.status) &&
            (filters.projectType === '' ||
                track.project_type_name === filters.projectType) &&
            (filters.vocalsNeeded === '' ||
                (filters.vocalsNeeded === 'yes'
                    ? track.vocals_needed
                    : !track.vocals_needed))
    );

    if (user === undefined) return null;

    return (
        <Container className={styles.tracksPageContainer}>
            <h2 className='my-4 mt-5 mb-5 text-center'>
                {isReviewer ? '🎵 Pending Tracks' : '🎵 Available Tracks'}
            </h2>

            {/* 🔍 Search & Filters */}
            <Row className='mb-3'>
                <Col md={4}>
                    <Form.Control
                        type='search'
                        placeholder='Search tracks...'
                        name='search'
                        value={filters.search}
                        onChange={setFilters}
                    />
                </Col>
                <Col md={2}>
                    <Form.Select
                        className='mt-sm-3'
                        name='genre'
                        value={filters.genre}
                        onChange={setFilters}
                    >
                        <option value=''>Genre</option>
                        <option value='EDM'>EDM</option>
                        <option value='Epic'>Epic</option>
                        <option value='Electronic'>Electronic</option>
                        <option value='Rock'>Rock</option>
                    </Form.Select>
                </Col>
                <Col md={2}>
                    <Form.Select
                        className='mt-sm-3'
                        name='mood'
                        value={filters.mood}
                        onChange={setFilters}
                    >
                        <option value=''>Mood</option>
                        <option value='Angry'>Angry</option>
                        <option value='Happy'>Happy</option>
                        <option value='Hype'>Hype</option>
                        <option value='Sad'>Sad</option>
                    </Form.Select>
                </Col>
                <Col md={2}>
                    <Form.Select
                        className='mt-sm-3'
                        name='status'
                        value={filters.status}
                        onChange={setFilters}
                    >
                        <option value=''>Status</option>
                        <option value='not_started'>Not Started</option>
                        <option value='in_production'>In Production</option>
                        <option value='ready_for_mixing'>
                            Ready for Mixing
                        </option>
                        <option value='ready_for_review'>
                            Ready for Review
                        </option>
                    </Form.Select>
                </Col>
                <Col md={2}>
                    <Form.Select
                        className='mt-sm-3'
                        name='vocalsNeeded'
                        value={filters.vocalsNeeded}
                        onChange={setFilters}
                    >
                        <option value=''>Vocals Needed?</option>
                        <option value='yes'>Yes</option>
                        <option value='no'>No</option>
                    </Form.Select>
                </Col>
            </Row>

            {loading && (
                <Spinner
                    animation='border'
                    className='d-block mx-auto'
                />
            )}
            {error && <Alert variant='danger'>{error}</Alert>}

            <div className={styles.trackList}>
                {filteredTracks.length ? (
                    filteredTracks.map((track) => (
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
