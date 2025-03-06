const clientId = import.meta.env.VITE_APP_SPOTIFY_CLIENT_ID;
const clientSecret = import.meta.env.VITE_APP_SPOTIFY_CLIENT_SECRET;
const baseUrl = import.meta.env.VITE_APP_SPOTIFY_BASE_URL;

export const getAccessToken = async () => {
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
        },
        body: 'grant_type=client_credentials'
    });

    if (response.ok) {
        const data = await response.json();
        return data.access_token;
    }
    throw new Error('Failed to fetch access token');
}

export const getPopularTracks = async () => {
    // sample track ids should change when we implement user login
    const trackIds = ['7ouMYWpwJ422jRcDASZB7P','4VqPOruhp5EdPBeR92t6lQ','2takcwOaAZWiXQijPHIx7B']

    const accessToken = await getAccessToken();

    const response = await fetch(`${baseUrl}/tracks?market=UG&ids=${trackIds.join(',')}`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });

    if (response.ok) {
        const data = await response.json();
        return data.tracks;
    }else{
        throw new Error('Failed to fetch popular songs');
    }

}

export const searchTrack = async(query)=>{
    const accessToken = await getAccessToken();

    const response = await fetch(`${baseUrl}/search?q=${encodeURIComponent(query)}&type=track&market=UG&limit=20`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });

    if (response.ok) {
        const data = await response.json();
        return data.tracks.items;
    } else {
        throw new Error('Failed to search tracks');
    }
}
