import PropTypes from 'prop-types';

export const commentPropType = PropTypes.shape({
    id: PropTypes.number.isRequired,
    owner: PropTypes.string.isRequired,
    track_id: PropTypes.number.isRequired,
    profile_image: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
});

export const commentListPropType = PropTypes.arrayOf(commentPropType);
