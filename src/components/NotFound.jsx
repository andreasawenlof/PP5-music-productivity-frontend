import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import styles from './NotFound.module.css';

const NotFound = () => {
    return (
        <Container className={styles.notFoundContainer}>
            <h1 className={styles.heading}>404</h1>
            <p className={styles.subheading}>
                Oops... Looks like the track you're looking for is out of tune.
            </p>
            <p className={styles.description}>
                Maybe it never existed, or maybe it just got lost in the mix.
                Either way, let's take you back to where the music is. 🎵
            </p>
            <Link to='/'>
                <Button className={styles.backButton}>Go Back Home</Button>
            </Link>
        </Container>
    );
};

export default NotFound;
