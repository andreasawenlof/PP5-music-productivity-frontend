import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import formStyles from '../../components/Forms.module.css';
import btnStyles from '../../components/Button.module.css';

import { Form, Button, Col, Row, Container, Alert } from 'react-bootstrap';
import axios from 'axios';

const SignUpForm = () => {
    const [signUpData, setSignUpData] = useState({
        username: '',
        password1: '',
        password2: '',
    });
    const { username, password1, password2 } = signUpData;

    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const handleChange = (event) => {
        setSignUpData({
            ...signUpData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('/dj-rest-auth/registration/', signUpData);
            navigate('/login');
        } catch (err) {
            setErrors(err.response?.data);
        }
    };

    return (
        <Row>
            <Col
                className='my-auto py-2 p-md-2'
                md={6}
            >
                <Container className='p-4'>
                    <h2 className='mb-3'>Signup</h2>

                    <Form
                        className={`${formStyles.formContainer}`}
                        onSubmit={handleSubmit}
                    >
                        <Form.Group controlId='username'>
                            <Form.Label visuallyHidden>username</Form.Label>
                            <Form.Control
                                className={`${formStyles.formInput} mb-3`}
                                type='text'
                                placeholder='Username'
                                name='username'
                                value={username}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        {errors.username?.map((message, idx) => (
                            <Alert
                                variant='warning'
                                key={idx}
                            >
                                {message}
                            </Alert>
                        ))}

                        <Form.Group controlId='password1'>
                            <Form.Label visuallyHidden>Password</Form.Label>
                            <Form.Control
                                className={`${formStyles.formInput} mb-3 `}
                                type='password'
                                placeholder='Password'
                                name='password1'
                                value={password1}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        {errors.password1?.map((message, idx) => (
                            <Alert
                                key={idx}
                                variant='warning'
                            >
                                {message}
                            </Alert>
                        ))}

                        <Form.Group controlId='password2'>
                            <Form.Label className='d-none'>
                                Confirm password
                            </Form.Label>
                            <Form.Control
                                className={`${formStyles.formInput} mb-3`}
                                type='password'
                                placeholder='Confirm password'
                                name='password2'
                                value={password2}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        {errors.password2?.map((message, idx) => (
                            <Alert
                                key={idx}
                                variant='warning'
                            >
                                {message}
                            </Alert>
                        ))}

                        <Button
                            className={`${btnStyles.postButton}`}
                            type='submit'
                        >
                            Sign up
                        </Button>
                        {errors.non_field_errors?.map((message, idx) => (
                            <Alert
                                key={idx}
                                variant='warning'
                                className='mt-3'
                            >
                                {message}
                            </Alert>
                        ))}
                    </Form>
                </Container>

                <Container className={`mt-3`}>
                    <Link
                        className={`${btnStyles.primaryBtn} ${btnStyles.btn}`}
                        to='/login'
                    >
                        Already have an account? <span>Login</span>
                    </Link>
                </Container>
            </Col>
            <Col
                md={6}
                className={`my-auto d-none d-md-block p-2`}
            ></Col>
        </Row>
    );
};

export default SignUpForm;
