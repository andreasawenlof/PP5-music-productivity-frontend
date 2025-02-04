import styles from './App.module.css';
import NavBar from './components/NavBar';
import TracksPage from './pages/tracks/tracksPage';
import { Col, Container, Row } from 'react-bootstrap';

function App() {
    return (
        <div className={styles.App}>
            <NavBar />
            <Container
                className={`${styles.Main} p-0 mt-5`}
                fluid
            >
                <Row>
                    <Col
                        md={12}
                        className='w-100'
                    >
                        <TracksPage />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default App;
