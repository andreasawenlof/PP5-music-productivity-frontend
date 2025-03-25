import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import styles from './WelcomePage.module.css'; // Reusing existing styling for consistency
import { useAuth } from '../contexts/AuthContext';

const WelcomePage = () => {
    const { user } = useAuth();
    return (
        <Container className={styles.notFoundContainer}>
            <h1 className={styles.heading}>Welcome to MP App 🎶</h1>
            <p className={styles.subheading}>
                Track your music. Collaborate with clarity.
            </p>
            <p className={styles.description}>
                This is a private collaboration tool designed for composers and
                reviewers to manage music projects from idea to final mix. 🔥
            </p>
            {!user && (
                <div className='d-flex justify-content-center gap-3 mt-4'>
                    <Link to='/login'>
                        <Button className={styles.backButton}>Login</Button>
                    </Link>
                    <Link to='/signup'>
                        <Button
                            variant='outline-light'
                            className={styles.backButton}
                        >
                            Sign Up
                        </Button>
                    </Link>
                </div>
            )}
        </Container>
    );
};

export default WelcomePage;
