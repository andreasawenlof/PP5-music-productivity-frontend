import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import styles from './TracksPage.module.css';

function TracksPage() {
    return (
        <Card className={styles.Card}>
            <Card.Header
                className={styles.CardHeader}
                as='h5'
            >
                Featured
            </Card.Header>
            <Card.Body>
                <Card.Title>Special title treatment</Card.Title>
                <Card.Text>
                    With supporting text below as a natural lead-in to
                    additional content.
                </Card.Text>
                <Button className={`${styles.Button} text-center `}>
                    Go somewhere
                </Button>
                <Button className={`${styles.Button} text-center `}>
                    Go somewhere
                </Button>
                <Button className={`${styles.Button} text-center `}>
                    Go somewhere
                </Button>
                <Button className={`${styles.Button} text-center `}>
                    Go somewhere
                </Button>
            </Card.Body>
        </Card>
    );
}

export default TracksPage;
