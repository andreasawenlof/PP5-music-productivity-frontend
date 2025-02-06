import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useAuth } from '../contexts/AuthContext';
import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.css';

const NavBar = () => {
    const { user, logout } = useAuth();

    return (
        <Navbar
            expand='md'
            className={styles.navbar}
            fixed='top'
        >
            <Container>
                <Navbar.Brand
                    as={NavLink}
                    to='/'
                    className={styles.brand}
                >
                    🎼 MP App
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='navbarScroll' />
                <Navbar.Collapse id='navbarScroll'>
                    <Nav className='ms-auto'>
                        <NavLink
                            className={styles.navLink}
                            to='/tracks'
                        >
                            Tracks
                        </NavLink>
                        <NavLink
                            className={styles.navLink}
                            to='/profiles'
                        >
                            Profiles
                        </NavLink>

                        {user ? (
                            <>
                                <span className={styles.welcome}>
                                    Welcome, {user.username}!
                                </span>
                                <NavLink
                                    className={styles.createTrackBtn}
                                    to='/tracks/create'
                                >
                                    + Create Track
                                </NavLink>
                                <button
                                    className={styles.logoutBtn}
                                    onClick={logout}
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <NavLink
                                    className={styles.navLink}
                                    to='/login'
                                >
                                    Login
                                </NavLink>
                                <NavLink
                                    className={styles.navLink}
                                    to='/signup'
                                >
                                    Sign Up
                                </NavLink>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;
