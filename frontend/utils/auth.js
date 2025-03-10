// frontend/utils/auth.js
export async function refreshAccessToken() {
    const refreshToken = localStorage.getItem('refreshToken');
    const res = await fetch('http://localhost:5000/auth/refresh-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: refreshToken }),
    });
    const data = await res.json();
    if (data.accessToken) {
        localStorage.setItem('accessToken', data.accessToken);
        return data.accessToken;
    }
    throw new Error('Unable to refresh token');
}
