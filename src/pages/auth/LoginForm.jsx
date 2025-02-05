import { useActionState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { axiosReq } from '../../api/axiosDefaults';

const loginAction = async (prevState, formData) => {
    const loginData = Object.fromEntries(formData.entries());
    try {
        const { data } = await axiosReq.post(
            'api/auth/dj-rest-auth/login/',
            loginData
        );
        return { success: true, errors: {}, user: data.user };
    } catch (err) {
        console.log(err);
        return {
            success: false,
        };
    }
};

function LoginForm() {
    const [formState, formAction, pending] = useActionState(loginAction, {
        success: false,
        errors: {},
    });
    return (
        <Form action={formAction}>
            <Form.Group
                className='mb-3'
                controlId='username'
            >
                <Form.Label>username</Form.Label>
                <Form.Control
                    type='username'
                    placeholder='username'
                    name='username'
                />
            </Form.Group>

            <Form.Group
                className='mb-3'
                controlId='formBasicPassword'
            >
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type='password'
                    placeholder='Password'
                    name='password'
                />
            </Form.Group>
            <Button
                variant='primary'
                type='submit'
            >
                Submit
            </Button>
        </Form>
    );
}

export default LoginForm;
