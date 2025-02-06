import ListGroup from 'react-bootstrap/ListGroup';
import TrackCard from './TrackCard';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import styles from './TracksList.module.css'; // ✅ Corrected Import

const TrackList = ({ tracks }) => {
    const [filter, setFilter] = useState('');

    const filteredTracks = tracks.filter((track) =>
        track.title.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div className={styles.trackListContainer}>
            {/* 🔍 Search Filter */}
            <Form.Control
                type='text'
                placeholder='Filter tracks...'
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className='mb-3'
            />

            <ListGroup className={styles.trackList}>
                {filteredTracks.length > 0 ? (
                    filteredTracks.map((track) => (
                        <TrackCard
                            key={track.id}
                            track={track}
                        />
                    ))
                ) : (
                    <p>No tracks found.</p>
                )}
            </ListGroup>
        </div>
    );
};

export default TrackList;
