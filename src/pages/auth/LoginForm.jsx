import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import formStyles from '../../components/Forms.module.css';
import btnStyles from '../../components/Button.module.css';
import { Col, Container, Row } from 'react-bootstrap';
import useAuthRedirect from '../../hooks/useAuthRedirect';
import { useMessage } from '../../contexts/MessageContext';

function LoginForm() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const isLoading = useAuthRedirect();

    // We’ll use setMessage for immediate errors,
    // and setTempMessage for success messages on the next page.
    const { setMessage, setTempMessage } = useMessage();

    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);

    // If we’re waiting on user data, or if your redirect logic is still computing...
    if (isLoading) return null;

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Attempt login
            await login(credentials.username, credentials.password);

            // On success, set a "temp" success message for the *next* page
            setTempMessage({
                type: 'success',
                text: 'Logged in successfully!',
            });

            // Then navigate to /tracks (or wherever you like)
            navigate('/tracks', { replace: true });
        } catch (err) {
            console.error('Login error:', err);

            // Show the error in the GLOBAL flash message (immediately)
            // We do NOT navigate anywhere since it's an error
            setMessage({
                type: 'danger',
                text:
                    err.response?.data?.detail ||
                    'Invalid username or password',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Row>
            <Col
                className='my-auto py-2 p-md-2'
                md={6}
            >
                <Container className='p-4'>
                    <h2 className='mb-3'>Login</h2>

                    <Form
                        className={formStyles.formContainer}
                        onSubmit={handleSubmit}
                    >
                        <Form.Group
                            className='mb-3'
                            controlId='username'
                        >
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                className={formStyles.formInput}
                                type='text'
                                name='username'
                                value={credentials.username}
                                onChange={handleChange}
                                placeholder='Enter username'
                                required
                            />
                        </Form.Group>

                        <Form.Group
                            className='mb-3'
                            controlId='password'
                        >
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                className={formStyles.formInput}
                                type='password'
                                name='password'
                                value={credentials.password}
                                onChange={handleChange}
                                placeholder='Enter password'
                                required
                            />
                        </Form.Group>

                        <Button
                            variant='none'
                            className={
                                loading
                                    ? btnStyles.tracksBtn
                                    : btnStyles.postButton
                            }
                            type='submit'
                            disabled={loading}
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </Button>
                    </Form>
                </Container>

                <Container className='mt-3'>
                    <Link
                        className={`${btnStyles.primaryBtn} ${btnStyles.btn}`}
                        to='/signup'
                    >
                        Don't have an account? <span>Sign up</span> to get one!
                    </Link>
                </Container>
            </Col>
            <Col
                md={6}
                className='my-auto d-none d-md-block p-2'
            />
        </Row>
    );
}

export default LoginForm;
