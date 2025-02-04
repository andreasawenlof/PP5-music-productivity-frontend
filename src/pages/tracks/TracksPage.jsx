import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import styles from './TracksPage.module.css';
import { Dropdown } from 'react-bootstrap';
import DropDown from '../../components/DropDown';

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
                <DropDown />
                <DropDown />
                <DropDown />
                <DropDown />
            </Card.Body>
        </Card>
    );
}

export default TracksPage;
