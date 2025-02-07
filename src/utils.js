import { jwtDecode } from 'jwt-decode';

export const setTokenTimestamp = (data) => {
    try {
        if (data?.refresh_token && typeof data.refresh_token === 'string') {
            const refreshTokenTimestamp = jwtDecode(data.refresh_token).exp;
            localStorage.setItem(
                'refreshTokenTimestamp',
                refreshTokenTimestamp.toString()
            );
        } else {
            console.warn('No valid refresh token found in the response data');
        }
    } catch (error) {
        console.error('Error setting token timestamp:', error);
        localStorage.removeItem('refreshTokenTimestamp');
    }
};

export const shouldRefreshToken = () => {
    const refreshTokenTimestamp = localStorage.getItem('refreshTokenTimestamp');
    if (!refreshTokenTimestamp) return false;

    const currentTime = Math.round(Date.now() / 1000);
    return Number(refreshTokenTimestamp) <= currentTime + 60;
};

export const removeTokenTimestamp = () => {
    localStorage.removeItem('refreshTokenTimestamp');
};
