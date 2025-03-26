// useDeleteTrack.js
import { useNavigate } from 'react-router-dom';
import { axiosRes } from '../api/axiosDefaults';
import { useMessage } from '../contexts/MessageContext';

const useDeleteTrack = (setTracks) => {
    const navigate = useNavigate();
    const { setMessage, setTempMessage } = useMessage();

    const handleDelete = async (event, trackId) => {
        // Let the user decide
        const confirmed = window.confirm(
            'Are you sure you want to delete this track?'
        );

        // AFTER user closes confirm, forcibly blur
        event.currentTarget?.blur();

        if (confirmed) {
            try {
                await axiosRes.delete(`/api/tracks/${trackId}/`);

                // Update local state to remove the track card
                setTracks((prevTracks) =>
                    prevTracks.filter((track) => track.id !== trackId)
                );

                // Next-page success message
                setTempMessage({
                    type: 'success',
                    text: 'Track deleted successfully!',
                });
                navigate('/tracks');
            } catch (err) {
                console.error('Error deleting track:', err);
                // Immediate error flash
                setMessage({
                    type: 'danger',
                    text: '❌ Error deleting track. Try again later.',
                });
            }
        }
    };

    return handleDelete;
};

export default useDeleteTrack;
