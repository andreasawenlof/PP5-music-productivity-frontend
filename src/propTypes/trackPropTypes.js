import PropTypes from 'prop-types';

export const trackPropType = PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    notes: PropTypes.string,
    status: PropTypes.string.isRequired,
    status_display: PropTypes.string,
    vocals_needed: PropTypes.bool.isRequired,
    vocals_status: PropTypes.string,
    project_type: PropTypes.shape({
        name: PropTypes.string.isRequired,
    }),
    genre: PropTypes.shape({
        name: PropTypes.string.isRequired,
    }),
    mood: PropTypes.shape({
        name: PropTypes.string.isRequired,
    }),
    album: PropTypes.shape({
        name: PropTypes.string,
    }),
    assigned_composer: PropTypes.shape({
        username: PropTypes.string.isRequired,
    }),
    created_at: PropTypes.string.isRequired,
});
