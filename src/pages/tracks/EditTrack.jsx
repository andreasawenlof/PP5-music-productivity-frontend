import { useEffect, useState, useActionState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { axiosReq, axiosRes } from '../../api/axiosDefaults';
import styles from './CreateEditTrack.module.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import formStyles from '../../components/forms.module.css';
import btnStyles from '../../components/Button.module.css';
import { useAuth } from '../../contexts/AuthContext';

const EditTrack = () => {
    const { id } = useParams(); // ✅ Get track ID from URL
    const navigate = useNavigate();
    const { user } = useAuth();

    // ✅ State for form options
    const [albums, setAlbums] = useState([]);
    const [moods, setMoods] = useState([]);
    const [genres, setGenres] = useState([]);
    const [projectTypes, setProjectTypes] = useState([]);
    const [track, setTrack] = useState(null);

    // ✅ Form state with actionState
    const [state, formAction] = useActionState(
        async (prev, formData) => {
            try {
                const response = await axiosRes.put(
                    `/api/tracks/${id}/`,
                    formData
                );
                navigate(`/tracks/${response.data.id}`);
            } catch (err) {
                return { error: 'Failed to update track. Please try again.' };
            }
        },
        { error: null }
    );

    // ✅ Fetch track data and form options
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [
                    { data: trackData },
                    { data: albums },
                    { data: moods },
                    { data: genres },
                    { data: projectTypes },
                ] = await Promise.all([
                    axiosReq.get(`/api/tracks/${id}/`),
                    axiosReq.get('/api/albums/'),
                    axiosReq.get('/api/moods/'),
                    axiosReq.get('/api/genres/'),
                    axiosReq.get('/api/project-types/'),
                ]);

                setTrack(trackData);
                setAlbums(albums);
                setMoods(moods);
                setGenres(genres);
                setProjectTypes(projectTypes);
            } catch (err) {
                console.error('Failed to fetch track data:', err);
            }
        };

        fetchData();
    }, [id]);

    useEffect(() => {
        if (user === null) {
            navigate('/login', { state: { from: '/tracks/create' } });
        }
    }, [user, navigate]);

    if (user === undefined) return null;

    if (!track) return <p>Loading...</p>;

    return (
        <Container className={styles.createTrackContainer}>
            <h2 className='text-center mb-4'>🎼 Edit Track</h2>
            {state.error && <Alert variant='danger'>{state.error}</Alert>}

            <Form
                className={`${formStyles.formContainer}`}
                action={formAction}
            >
                <Form.Group controlId='title'>
                    <Form.Label>Track Title</Form.Label>
                    <Form.Control
                        className={`${formStyles.formInput}`}
                        type='text'
                        name='title'
                        required
                        defaultValue={track.title}
                    />
                </Form.Group>
                <Form.Group controlId='album'>
                    <Form.Label>Album Name</Form.Label>
                    <Form.Select
                        className={`${formStyles.formInput}`}
                        name='album'
                        defaultValue={track.album || ''}
                    >
                        <option value=''>No Album</option> {/* Add this line */}
                        {albums.map((album) => (
                            <option
                                key={album.id}
                                value={album.id}
                            >
                                {album.title}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group controlId='mood'>
                    <Form.Label>Mood</Form.Label>
                    <Form.Select
                        className={`${formStyles.formInput}`}
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
                <Form.Group controlId='genre'>
                    <Form.Label>Genre</Form.Label>
                    <Form.Select
                        className={`${formStyles.formInput}`}
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
                <Form.Group controlId='project_type'>
                    <Form.Label>Project Type</Form.Label>
                    <Form.Select
                        className={`${formStyles.formInput}`}
                        name='project_type'
                        defaultValue={track.project_type}
                    >
                        {projectTypes.map((projectType) => (
                            <option
                                key={projectType.id}
                                value={projectType.id}
                            >
                                {projectType.name}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Form.Group controlId='status'>
                    <Form.Label>Status</Form.Label>
                    <Form.Select
                        className={`${formStyles.formInput}`}
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

                <Form.Group controlId='vocals_needed'>
                    <Form.Check
                        type='checkbox'
                        name='vocals_needed'
                        label='Vocals Needed'
                        defaultChecked={track.vocals_needed}
                    />
                </Form.Group>
                <Form.Group controlId='notes'>
                    <Form.Label>Notes</Form.Label>
                    <Form.Control
                        className={`${formStyles.textAreaInput}`}
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
