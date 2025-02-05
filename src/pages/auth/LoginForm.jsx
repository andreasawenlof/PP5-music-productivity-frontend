import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import useAuthRedirect from '../../hooks/useAuthRedirect'; // ✅ Import the custom hook
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

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
            await login(credentials);
            navigate('/'); // Redirect to homepage after login
        } catch (err) {
            setError('Invalid username or password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <h2 className='mb-3'>Login</h2>

            {error && <Alert variant='danger'>{error}</Alert>}

            <Form.Group
                className='mb-3'
                controlId='username'
            >
                <Form.Label>Username</Form.Label>
                <Form.Control
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
                    type='password'
                    name='password'
                    value={credentials.password}
                    onChange={handleChange}
                    placeholder='Enter password'
                    required
                />
            </Form.Group>

            <Button
                variant='primary'
                type='submit'
                disabled={loading}
            >
                {loading ? 'Logging in...' : 'Login'}
            </Button>
        </Form>
    );
}

export default LoginForm;
