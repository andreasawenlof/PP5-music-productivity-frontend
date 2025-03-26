import { useEffect, useState, useActionState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { axiosReq, axiosRes } from '../../api/axiosDefaults';
import styles from './CreateEditTrack.module.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import formStyles from '../../components/Forms.module.css';
import btnStyles from '../../components/Button.module.css';
import { useAuth } from '../../contexts/AuthContext';
import { useMessage } from '../../contexts/MessageContext';

const EditTrack = () => {
    const { id } = useParams(); // ✅ The track ID from URL
    const navigate = useNavigate();
    const { user } = useAuth();

    // We use setTempMessage for success, setMessage for immediate errors
    const { setTempMessage, setMessage } = useMessage();

    // State for form options & track data
    const [albums, setAlbums] = useState([]);
    const [moods, setMoods] = useState([]);
    const [genres, setGenres] = useState([]);
    const [projectTypes, setProjectTypes] = useState([]);
    const [track, setTrack] = useState(null);

    // useActionState handles submission
    const [state, formAction] = useActionState(
        async (prev, formData) => {
            try {
                // Attempt to update track
                const response = await axiosRes.put(
                    `/api/tracks/${id}/`,
                    formData
                );

                // On success, show a next-page flash
                setTempMessage({
                    type: 'success',
                    text: 'Track updated successfully!',
                });
                navigate(`/tracks/${response.data.id}`);
            } catch (err) {
                console.error('Update Track error:', err);

                // 1) Show immediate global flash
                setMessage({
                    type: 'danger',
                    text: 'Failed to update track. Please try again.',
                });

                // 2) Also store a local error for inline <Alert> below heading
                return { error: 'Failed to update track. Please try again.' };
            }
        },
        { error: null }
    );

    // Fetch track data and supporting lists
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [
                    { data: trackData },
                    { data: albumsData },
                    { data: moodsData },
                    { data: genresData },
                    { data: projectTypesData },
                ] = await Promise.all([
                    axiosReq.get(`/api/tracks/${id}/`),
                    axiosReq.get('/api/albums/'),
                    axiosReq.get('/api/moods/'),
                    axiosReq.get('/api/genres/'),
                    axiosReq.get('/api/project-types/'),
                ]);

                setTrack(trackData);
                setAlbums(albumsData);
                setMoods(moodsData);
                setGenres(genresData);
                setProjectTypes(projectTypesData);
            } catch (err) {
                console.error('Failed to fetch track data:', err);
            }
        };

        fetchData();
    }, [id]);

    // If not logged in, bounce to login
    useEffect(() => {
        if (user === null) {
            navigate('/login', { state: { from: `/tracks/${id}/edit` } });
        }
    }, [user, id, navigate]);

    if (user === undefined) return null; // Wait for user to load
    if (!track) return <p>Loading...</p>; // Wait for track data

    return (
        <Container className={styles.createTrackContainer}>
            <h2 className='text-center mb-4'>🎼 Edit Track</h2>

            {/* Inline error alert if useActionState returned { error: ... } */}
            {state.error && <Alert variant='danger'>{state.error}</Alert>}

            <Form
                className={formStyles.formContainer}
                action={formAction}
            >
                {/* Title */}
                <Form.Group controlId='title'>
                    <Form.Label>Track Title</Form.Label>
                    <Form.Control
                        className={formStyles.formInput}
                        type='text'
                        name='title'
                        required
                        defaultValue={track.title}
                    />
                </Form.Group>

                {/* 
          If you want the album select, re-enable it here
          <Form.Group controlId="album"> ... </Form.Group>
        */}

                {/* Mood */}
                <Form.Group controlId='mood'>
                    <Form.Label>Mood</Form.Label>
                    <Form.Select
                        className={formStyles.formInput}
                        name='mood'
                        defaultValue={track.mood}
                    >
                        {moods.map((mood) => (
                            <option
                                key={mood.id}
                                value={mood.id}
                            >
                                {mood.name}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>

                {/* Genre */}
                <Form.Group controlId='genre'>
                    <Form.Label>Genre</Form.Label>
                    <Form.Select
                        className={formStyles.formInput}
                        name='genre'
                        defaultValue={track.genre}
                    >
                        {genres.map((genre) => (
                            <option
                                key={genre.id}
                                value={genre.id}
                            >
                                {genre.name}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>

                {/* Project Type */}
                <Form.Group controlId='project_type'>
                    <Form.Label>Project Type</Form.Label>
                    <Form.Select
                        className={formStyles.formInput}
                        name='project_type'
                        defaultValue={track.project_type}
                    >
                        {projectTypes.map((pt) => (
                            <option
                                key={pt.id}
                                value={pt.id}
                            >
                                {pt.name}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>

                {/* Status */}
                <Form.Group controlId='status'>
                    <Form.Label>Status</Form.Label>
                    <Form.Select
                        className={formStyles.formInput}
                        name='status'
                        defaultValue={track.status}
                    >
                        <option value='not_started'>Not Started</option>
                        <option value='in_production'>In Production</option>
                        <option value='ready_for_mixing'>
                            Ready for Mixing
                        </option>
                        <option value='ready_for_review'>
                            Ready for Review
                        </option>
                    </Form.Select>
                </Form.Group>

                {/* Vocals Needed */}
                <Form.Group controlId='vocals_needed'>
                    <Form.Check
                        type='checkbox'
                        name='vocals_needed'
                        label='Vocals Needed'
                        defaultChecked={track.vocals_needed}
                    />
                </Form.Group>

                {/* Notes */}
                <Form.Group controlId='notes'>
                    <Form.Label>Notes</Form.Label>
                    <Form.Control
                        className={formStyles.textAreaInput}
                        type='textarea'
                        name='notes'
                        defaultValue={track.notes}
                    />
                </Form.Group>

                <Button
                    type='submit'
                    className={`${btnStyles.postButton} mt-3`}
                >
                    Update Track
                </Button>
            </Form>
        </Container>
    );
};

export default EditTrack;
