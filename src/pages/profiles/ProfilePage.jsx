import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { axiosReq, axiosRes } from '../../api/axiosDefaults';
import { useAuth } from '../../contexts/AuthContext';
import styles from './ProfilePage.module.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import btnStyles from '../../components/Button.module.css';
import formStyles from '../../components/Forms.module.css';
import { useMessage } from '../../contexts/MessageContext';

const ProfilePage = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();

    // Use global message context for success & error
    const { setMessage, setTempMessage } = useMessage();

    const [profile, setProfile] = useState(null);
    const [displayName, setDisplayName] = useState('');
    const [bio, setBio] = useState('');
    const [avatar, setAvatar] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(true);

    // 1) Fetch profile data
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data } = await axiosReq.get(`/api/profiles/${id}/`);
                setProfile(data);
                setDisplayName(data.display_name);
                setBio(data.bio);
            } catch (err) {
                console.error('❌ Error fetching profile:', err);
                // Set a one-time error message for the *next* page
                setTempMessage({
                    type: 'danger',
                    text: 'Failed to load profile.',
                });
                navigate('/404');
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [id, navigate, setTempMessage]);

    // 2) Handle updating the profile
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            if (displayName !== profile.display_name) {
                formData.append('display_name', displayName);
            }
            if (bio !== profile.bio) {
                formData.append('bio', bio);
            }
            if (avatar) {
                formData.append('avatar', avatar);
            }

            const { data } = await axiosRes.patch(
                `/api/profiles/${id}/`,
                formData
            );
            setProfile(data);
            setEditMode(false);

            // Show a success message on the same page
            setMessage({
                type: 'success',
                text: 'Profile updated successfully!',
            });
        } catch (err) {
            console.error('❌ Error updating profile:', err);
            // Show an immediate error on the same page
            setMessage({
                type: 'danger',
                text: 'Failed to update profile. Please try again.',
            });
        }
    };

    // 3) Cancel edits
    const handleCancel = () => {
        setEditMode(false);
        setDisplayName(profile.display_name);
        setBio(profile.bio);
        setAvatar(null); // optional: clear selected file
    };

    // 4) Render states
    if (loading) {
        return (
            <Spinner
                animation='border'
                className='d-block mx-auto mt-5'
            />
        );
    }

    if (!profile) {
        // If profile is null after loading,
        // you might already have navigated to /404.
        return <p className='text-center'>Profile not found.</p>;
    }

    return (
        <Container className={styles.profileContainer}>
            <h2 className='text-center mb-4'>👤 Profile</h2>

            <div className={styles.profileContent}>
                {/* Avatar Section (always visible) */}
                <div className={styles.avatarWrapper}>
                    <img
                        src={profile.avatar}
                        alt='Profile'
                        className={styles.profileAvatar}
                    />
                </div>

                {/* Toggle "View" vs "Edit" mode */}
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
                                className={btnStyles.postButton}
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
                                onClick={() => setEditMode(true)}
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
