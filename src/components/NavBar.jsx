import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import styles from './NavBar.module.css';
import { useAuth } from '../contexts/AuthContext';
import { NavLink } from 'react-router-dom';

function NavBar() {
    const { user, logout } = useAuth();
    return (
        <Navbar
            expand='md'
            className={`bg-body-tertiary ${styles.NavBar}`}
            fixed='top'
        >
            <Container fluid>
                <Navbar.Brand href='#'>MP App</Navbar.Brand>
                <Navbar.Toggle aria-controls='navbarScroll' />
                <Navbar.Collapse id='navbarScroll'>
                    <Nav
                        className='ms-auto my-2 my-lg-0'
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Item>
                            <NavLink
                                className='nav-link'
                                to='/'
                            >
                                Home
                            </NavLink>
                        </Nav.Item>
                        <Nav.Item>
                            <NavLink
                                className='nav-link'
                                to='/profiles'
                            >
                                Profiles
                            </NavLink>
                        </Nav.Item>
                        <Nav.Item>
                            {user ? (
                                <>
                                    <Nav.Item>
                                        <span className='nav-link'>
                                            Welcome, {user.username}!
                                        </span>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <button
                                            className='btn btn-link nav-link'
                                            onClick={logout}
                                        >
                                            Logout
                                        </button>
                                    </Nav.Item>
                                </>
                            ) : (
                                <>
                                    <Nav.Item>
                                        <NavLink
                                            className='nav-link'
                                            to='/login'
                                        >
                                            Login
                                        </NavLink>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <NavLink
                                            className='nav-link'
                                            to='/signup'
                                        >
                                            Sign Up
                                        </NavLink>
                                    </Nav.Item>
                                </>
                            )}
                        </Nav.Item>
                        <NavDropdown
                            title='More'
                            id='navbarScrollingDropdown'
                        >
                            <NavDropdown.Item>Action</NavDropdown.Item>
                            <NavDropdown.Item>Another action</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item>
                                Something else here
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Form className='d-flex'>
                        <Form.Control
                            type='search'
                            placeholder='Search'
                            className='me-2'
                            aria-label='Search'
                        />
                        <Button variant='outline-success'>Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;
