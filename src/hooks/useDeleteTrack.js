import { useNavigate } from 'react-router-dom';
import { axiosRes } from '../api/axiosDefaults';

const useDeleteTrack = (setTracks) => {
    const navigate = useNavigate();

    const handleDelete = async (trackId) => {
        if (window.confirm('Are you sure you want to delete this track?')) {
            try {
                await axiosRes.delete(`/api/tracks/${trackId}/`);
                alert('✅ Track deleted successfully!');

                // ✅ Update UI instantly by removing track from state
                setTracks((prevTracks) =>
                    prevTracks.filter((track) => track.id !== trackId)
                );

                // If on track details page, redirect to tracks list
                navigate('/tracks');
            } catch (err) {
                alert('❌ Error deleting track. Try again.');
                console.error('Error:', err);
            }
        }
    };

    return handleDelete;
};

export default useDeleteTrack;
