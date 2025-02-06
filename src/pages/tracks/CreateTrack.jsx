import { useActionState, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';
import styles from './CreateEditTrack.module.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import formStyles from '../../components/Forms.module.css';
import btnStyles from '../../components/Button.module.css';
import { useAuth } from '../../contexts/AuthContext';

const CreateTrack = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [albums, setAlbums] = useState([]);
    const [moods, setMoods] = useState([]);
    const [genres, setGenres] = useState([]);
    const [projectTypes, setProjectTypes] = useState([]);

    const [state, formAction] = useActionState(
        async (prev, formData) => {
            try {
                formData.assigned_composer_username = user.username;
                const response = await axiosReq.post('/api/tracks/', formData);
                navigate(`/tracks/${response.data.id}`);
            } catch (err) {
                return { error: 'Failed to create track. Please try again.' };
            }
        },
        { error: null }
    );

    useEffect(() => {
        const fetchData = async () => {
            try {
                const albumResponse = await axiosReq.get('/api/albums/');
                const moodResponse = await axiosReq.get('/api/moods/');
                const genreResponse = await axiosReq.get('/api/genres/');
                const projectTypeResponse = await axiosReq.get(
                    '/api/project-types/'
                );

                setAlbums(albumResponse.data);
                setMoods(moodResponse.data);
                setGenres(genreResponse.data);
                setProjectTypes(projectTypeResponse.data);
            } catch (err) {
                console.error('Failed to fetch data:', err);
            }
        };

        fetchData();
    }, []);

    return (
        <Container className={styles.createTrackContainer}>
            <h2 className='text-center mb-4'>🎼 Create a New Track</h2>
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
                    />
                </Form.Group>
                <Form.Group controlId='album'>
                    <Form.Label>Album Name</Form.Label>
                    <Form.Select
                        className={`${formStyles.formInput}`}
                        name='album'
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
                <Form.Group controlId='assigned_composer_username'>
                    <Form.Label>Assigned Composer</Form.Label>
                    <Form.Control
                        className={`text-white`}
                        readOnly
                        plaintext
                        type='text'
                        name='assigned_composer_username'
                        defaultValue={user.username}
                    />
                </Form.Group>
                <Form.Group controlId='mood'>
                    <Form.Label>Mood</Form.Label>
                    <Form.Select
                        className={`${formStyles.formInput}`}
                        name='mood'
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
                    />
                </Form.Group>
                <Form.Group controlId='notes'>
                    <Form.Label>Notes</Form.Label>
                    <Form.Control
                        className={`${formStyles.textAreaInput}`}
                        type='textarea'
                        name='notes'
                    />
                </Form.Group>

                <Button
                    type='submit'
                    className={`${btnStyles.postButton} mt-3`}
                >
                    Create Track
                </Button>
            </Form>
        </Container>
    );
};

export default CreateTrack;
