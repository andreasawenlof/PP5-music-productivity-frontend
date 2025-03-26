import { createContext, useContext, useRef, useState } from 'react';

const MessageContext = createContext();
export const useMessage = () => useContext(MessageContext);

export const MessageProvider = ({ children }) => {
    const [message, setMessage] = useState(null);
    const tempMessageRef = useRef(null);

    const clearMessage = () => setMessage(null);

    const setTempMessage = (msg) => {
        tempMessageRef.current = msg;
    };

    const consumeTempMessage = () => {
        const msg = tempMessageRef.current;
        tempMessageRef.current = null;
        return msg;
    };

    return (
        <MessageContext.Provider
            value={{
                message,
                setMessage,
                clearMessage,
                setTempMessage,
                consumeTempMessage,
            }}
        >
            {children}
        </MessageContext.Provider>
    );
};
