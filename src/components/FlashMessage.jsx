import { Alert } from 'react-bootstrap';
import { useMessage } from '../contexts/MessageContext';
import { useEffect } from 'react';

const FlashMessage = () => {
    const { message, clearMessage } = useMessage();

    useEffect(() => {
        if (message) {
            const timeout = setTimeout(clearMessage, 4000);
            return () => clearTimeout(timeout);
        }
    }, [message, clearMessage]);

    if (!message) return null;

    return (
        <Alert
            variant={message.type || 'info'}
            className='text-center'
            style={{
                /* Fixed positioning so it stays on screen */
                position: 'fixed',
                /* If your navbar is ~56px tall, push this to ~60px or so */
                top: '80px',
                left: 0,
                width: '100%',
                zIndex: 9999,
                margin: 0 /* remove default margin so it stays flush */,
            }}
        >
            {message.text}
        </Alert>
    );
};

export default FlashMessage;
