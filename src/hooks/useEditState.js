import { useState } from 'react';

export const useEditState = (initialContent = '') => {
    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState(initialContent);
    const [error, setError] = useState(null);

    const startEditing = () => setIsEditing(true);
    const cancelEditing = () => {
        setIsEditing(false);
        setEditContent(initialContent); // Reset content when canceling
    };

    const saveEdit = (content) => {
        setEditContent(content);
        setIsEditing(false);
    };

    return {
        isEditing,
        editContent,
        error,
        startEditing,
        cancelEditing,
        saveEdit,
        setError,
        setEditContent, // You can also expose this if you want to handle direct content change elsewhere
    };
};
