import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useAuth } from '../contexts/AuthContext';
import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.css';
import btnStyles from './Button.module.css';

const NavBar = () => {
    const { user, logout } = useAuth();
    const isComposer = user?.is_composer;
    const isReviewer = user?.is_reviewer;

    return (
        <Navbar
            expand='md'
            className={styles.navbar}
            fixed='top'
        >
            <Container>
                <Navbar.Brand
                    as={NavLink}
                    to={user ? '/tracks' : '/login'}
                    className={styles.brand}
                >
                    🎼 MP App
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='navbarScroll' />
                <Navbar.Collapse id='navbarScroll'>
                    {user && (
                        <img
                            src={user.profile_image}
                            alt=''
                            className={styles.mobileAvatar}
                        />
                    )}
                    <Nav className='ms-auto'>
                        {user ? (
                            <>
                                <NavLink
                                    className={`${btnStyles.tracksBtn} ${btnStyles.btn}`}
                                    to='/tracks'
                                >
                                    {isReviewer ? 'Pending Tracks' : 'Tracks'}
                                </NavLink>

                                {isComposer && (
                                    <NavLink
                                        className={`${btnStyles.createTrackBtn} ${btnStyles.btn}`}
                                        to='/tracks/create'
                                    >
                                        + Create
                                    </NavLink>
                                )}
                                <div
                                    className={`${styles.navAvatarContainer} ${styles.navAvatar}`}
                                >
                                    <NavLink
                                        to={`/profiles/${user.profile_id}`}
                                    >
                                        <img
                                            src={user.profile_image}
                                            alt=''
                                            className={styles.navAvatar}
                                        />
                                    </NavLink>
                                </div>
                                <button
                                    className={`${btnStyles.logoutBtn} ${btnStyles.btn}`}
                                    onClick={logout}
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <NavLink
                                    className={`${btnStyles.loginBtn} ${btnStyles.btn}`}
                                    to='/login'
                                >
                                    Login
                                </NavLink>
                                <NavLink
                                    className={`${btnStyles.signupBtn} ${btnStyles.btn}`}
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
