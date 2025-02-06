import { useActionState, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';
import styles from './CreateEditTrack.module.css'; // ✅ CSS Import
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';

const CreateTrack = () => {
    const navigate = useNavigate();
    const [albums, setAlbums] = useState([]);
    const [moods, setMoods] = useState([]);
    const [genres, setGenres] = useState([]);
    const [projectTypes, setProjectTypes] = useState([]);

    const [state, formAction] = useActionState(
        async (prev, formData) => {
            try {
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
            <Form action={formAction}>
                <Form.Group controlId='title'>
                    <Form.Label>Track Title</Form.Label>
                    <Form.Control
                        type='text'
                        name='title'
                        required
                    />
                </Form.Group>
                <Form.Group controlId='album'>
                    <Form.Label>Album Name</Form.Label>
                    <Form.Select name='album'>
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
                    <Form.Select name='mood'>
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
                    <Form.Select name='genre'>
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
                    <Form.Select name='project_type'>
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
                    <Form.Select name='status'>
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

                <Button
                    variant='primary'
                    type='submit'
                    className='mt-3'
                >
                    Create Track
                </Button>
            </Form>
        </Container>
    );
};

export default CreateTrack;
