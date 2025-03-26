import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { axiosReq, axiosRes } from '../../api/axiosDefaults';
import { useAuth } from '../../contexts/AuthContext';
import styles from './ProfilePage.module.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import btnStyles from '../../components/Button.module.css';
import formStyles from '../../components/Forms.module.css';
import { useMessage } from '../../contexts/MessageContext';

const ProfilePage = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [profile, setProfile] = useState(null);
    const [displayName, setDisplayName] = useState('');
    const [bio, setBio] = useState('');
    const [avatar, setAvatar] = useState(null);
    const [editMode, setEditMode] = useState(false); // ✅ Toggle Edit Mode
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { setMessage, setTempMessage } = useMessage();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data } = await axiosReq.get(`/api/profiles/${id}/`);
                setProfile(data);
                setDisplayName(data.display_name);
                setBio(data.bio);
            } catch (err) {
                console.error('❌ Error fetching profile:', err);
                setError('Failed to load profile.');
                navigate('/404');
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            if (displayName !== profile.display_name)
                formData.append('display_name', displayName);
            if (bio !== profile.bio) formData.append('bio', bio);
            if (avatar) formData.append('avatar', avatar);

            const { data } = await axiosRes.patch(
                `/api/profiles/${id}/`,
                formData
            );
            setProfile(data);
            setEditMode(false); // ✅ Exit Edit Mode
            setMessage({
                type: 'success',
                text: 'Profile updated successfully!',
            });
        } catch (err) {
            console.error('❌ Error updating profile:', err);
            setError('Failed to update profile.');
            setMessage({
                type: 'danger',
                text: 'Failed to update profile. Please try again.',
            });
        }
    };

    const handleCancel = () => {
        setEditMode(false); // ✅ Exit Edit Mode without saving
        setDisplayName(profile.display_name);
        setBio(profile.bio);
    };

    if (loading)
        return (
            <Spinner
                animation='border'
                className='d-block mx-auto mt-5'
            />
        );
    if (!profile) return <p className='text-center'>Profile not found.</p>;

    return (
        <Container className={styles.profileContainer}>
            <h2 className='text-center mb-4'>👤 Profile</h2>
            {error && <Alert variant='danger'>{error}</Alert>}

            <div className={styles.profileContent}>
                {/* ✅ Avatar Upload Always Available */}
                <div className={styles.avatarWrapper}>
                    <img
                        src={profile.avatar}
                        alt='Profile'
                        className={styles.profileAvatar}
                    />
                </div>

                {/* ✅ Toggle Between "View" and "Edit" Mode */}
                {editMode ? (
                    <Form
                        onSubmit={handleUpdate}
                        className={styles.profileForm}
                    >
                        <Form.Group controlId='displayName'>
                            <Form.Label>Display Name</Form.Label>
                            <Form.Control
                                type='text'
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId='bio'>
                            <Form.Label>Bio</Form.Label>
                            <Form.Control
                                as='textarea'
                                rows={3}
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Control
                            type='file'
                            accept='image/*'
                            onChange={(e) => setAvatar(e.target.files[0])}
                            className={`${formStyles.formInput} w-50`}
                        />

                        <div className='d-flex flex-column'>
                            <Button
                                type='submit'
                                className={`${btnStyles.postButton}`}
                            >
                                Save Changes
                            </Button>
                            <Button
                                onClick={handleCancel}
                                className={`${btnStyles.tracksBtn} rounded mt-3`}
                            >
                                Cancel
                            </Button>
                        </div>
                    </Form>
                ) : (
                    <div className={styles.profileInfo}>
                        <h3>{profile.display_name}</h3>
                        <p>{profile.bio || 'No bio yet...'}</p>
                        {profile.is_composer && (
                            <p>
                                <strong>Role:</strong> Composer
                            </p>
                        )}
                        {profile.is_reviewer && !profile.is_composer && (
                            <p>
                                <strong>Role:</strong> Reviewer
                            </p>
                        )}
                        {!profile.is_composer && !profile.is_reviewer && (
                            <p>
                                <strong>Role:</strong> User
                            </p>
                        )}
                        {user && user.profile_id === profile.id && (
                            <Button
                                onClick={() => setEditMode(true)} // ✅ Enables edit mode
                                className={btnStyles.postButton}
                            >
                                Edit Profile
                            </Button>
                        )}
                    </div>
                )}
            </div>
        </Container>
    );
};

export default ProfilePage;
