import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import styles from './Forbidden.module.css';

const Forbidden = () => {
    return (
        <Container className={styles.ForbiddenContainer}>
            <h1 className={styles.heading}>403</h1>
            <p className={styles.subheading}>
                Oops... Looks like you don't have access to the page you're
                trying to reach.
            </p>
            <p className={styles.description}>
                . Let's take you back to where the music is. 🎵
            </p>
            <Link to='/'>
                <Button className={styles.backButton}>Go Back Home</Button>
            </Link>
        </Container>
    );
};

export default Forbidden;
