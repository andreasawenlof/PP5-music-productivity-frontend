import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useMessage } from './contexts/MessageContext';
import styles from './App.module.css';
import AppRoutes from './AppRoutes';
import NavBar from './components/NavBar';
import { Col, Container, Row } from 'react-bootstrap';
import FlashMessage from './components/FlashMessage';

function App() {
    const { setMessage, consumeTempMessage } = useMessage();
    const location = useLocation(); // <-- the route object

    useEffect(() => {
        // Every time we navigate, consume any new "temp" flash message
        const msg = consumeTempMessage();
        if (msg) {
            setMessage(msg);
        }
    }, [location, consumeTempMessage, setMessage]);

    return (
        <div className={styles.App}>
            <NavBar />
            <FlashMessage />
            <Container
                className={`${styles.Main} p-0 mt-5`}
                fluid
            >
                <Row>
                    <Col
                        md={12}
                        className='w-100'
                    >
                        <AppRoutes />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default App;
