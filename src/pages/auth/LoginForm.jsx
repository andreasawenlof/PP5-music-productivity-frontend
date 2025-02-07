import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import useAuthRedirect from '../../hooks/useAuthRedirect'; // ✅ Import the custom hook
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import formStyles from '../../components/Forms.module.css';
import btnStyles from '../../components/Button.module.css';
import { Col, Container, Row } from 'react-bootstrap';

function LoginForm() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // ✅ Use the custom hook to check if the user is already logged in
    const isLoading = useAuthRedirect();

    // ✅ If auth check is still running, don't render the form yet
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
        setError(null);

        try {
            await login(credentials.username, credentials.password);
            navigate('/'); // Redirect to homepage after login
        } catch (err) {
            console.error('Login error:', err);
            setError(
                err.response?.data?.detail || 'Invalid username or password'
            );
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
                        className={`${formStyles.formContainer}`}
                        onSubmit={handleSubmit}
                    >
                        <Form.Group
                            className='mb-3'
                            controlId='username'
                        >
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                className={`${formStyles.formInput}`}
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
                                className={`${formStyles.formInput}`}
                                type='password'
                                name='password'
                                value={credentials.password}
                                onChange={handleChange}
                                placeholder='Enter password'
                                required
                            />
                        </Form.Group>

                        <Button
                            className={`${btnStyles.postButton}`}
                            type='submit'
                            disabled={loading}
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </Button>
                    </Form>
                </Container>

                <Container className={`mt-3`}>
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
                className={`my-auto d-none d-md-block p-2`}
            ></Col>
        </Row>
        // <Row>
        //     <Col
        //         className='my-auto py-2 p-md-2'
        //         md={6}
        //     >
        //         <Container className='p-4'>
        //             <h2 className='mb-3'>Login</h2>
        //         <Form
        //             className={`${formStyles.formContainer}`}
        //             onSubmit={handleSubmit}
        //         >

        //             {error && <Alert variant='danger'>{error}</Alert>}

        //             <Form.Group
        //                 className='mb-3'
        //                 controlId='username'
        //             >
        //                 <Form.Label>Username</Form.Label>
        //                 <Form.Control
        //                     className={`${formStyles.formInput}`}
        //                     type='text'
        //                     name='username'
        //                     value={credentials.username}
        //                     onChange={handleChange}
        //                     placeholder='Enter username'
        //                     required
        //                 />
        //             </Form.Group>

        //             <Form.Group
        //                 className='mb-3'
        //                 controlId='password'
        //             >
        //                 <Form.Label>Password</Form.Label>
        //                 <Form.Control
        //                     className={`${formStyles.formInput}`}
        //                     type='password'
        //                     name='password'
        //                     value={credentials.password}
        //                     onChange={handleChange}
        //                     placeholder='Enter password'
        //                     required
        //                 />
        //             </Form.Group>

        //             <Button
        //                 className={`${btnStyles.postButton}`}
        //                 type='submit'
        //                 disabled={loading}
        //             >
        //                 {loading ? 'Logging in...' : 'Login'}
        //             </Button>
        //         </Form>
        //         <Container className={`mt-3 text-center`}>
        //             <Link
        //                 className={`${btnStyles.primaryBtn} ${btnStyles.btn}`}
        //                 to='/signup'
        //             >
        //                 Don't have an account? <span>Sign up</span>
        //             </Link>
        //         </Container>
        //     </Container>
        //     <Col
        //         md={6}
        //         className={`my-auto d-none d-md-block p-2`}
        //     ></Col>
        // </Row>
    );
}

export default LoginForm;
