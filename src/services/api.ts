// Type definitions for Spotify API
export interface ExternalUrls {
  spotify: string;
}

export interface Artist {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

export interface Image {
  url: string;
  height: number;
  width: number;
}

export interface Album {
  album_type: string;
  total_tracks: number;
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: string;
  restrictions?: { reason: string };
  type: string;
  uri: string;
  artists: Artist[];
}

export interface ExternalIds {
  isrc?: string;
  ean?: string;
  upc?: string;
}

export interface Track {
  album: Album;
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: ExternalIds;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_playable: boolean;
  linked_from?: any;
  restrictions?: { reason: string };
  name: string;
  popularity: number;
  preview_url: string | null;
  track_number: number;
  type: string;
  uri: string;
  is_local: boolean;
}

export interface SearchResponse {
  tracks: {
    href: string;
    items: Track[];
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
  };
}

export interface Playlist {
  collaborative: boolean;
  description: string;
  external_urls: ExternalUrls;
  followers: {
    href: string | null;
    total: number;
  };
  href: string;
  id: string;
  images: Image[];
  name: string;
  owner: {
    display_name: string;
    external_urls: ExternalUrls;
    href: string;
    id: string;
    type: string;
    uri: string;
  };
  primary_color: string | null;
  public: boolean;
  snapshot_id: string;
  tracks: {
    href: string;
    total: number;
  };
  type: string;
  uri: string;
}

// API functions
const clientId = import.meta.env.VITE_APP_SPOTIFY_CLIENT_ID;
const clientSecret = import.meta.env.VITE_APP_SPOTIFY_CLIENT_SECRET;
const baseUrl = import.meta.env.VITE_APP_SPOTIFY_BASE_URL;

export const getAccessToken = async (): Promise<string> => {
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
};

export const getPopularTracks = async (): Promise<Track[]> => {
  // Popular track IDs from various genres
  const trackIds = [
    '7ouMYWpwJ422jRcDASZB7P', // Kill Bill - SZA
    '4VqPOruhp5EdPBeR92t6lQ', // Flowers - Miley Cyrus
    '2takcwOaAZWiXQijPHIx7B', // As It Was - Harry Styles
    '1BxfuPKGuaTgP7aM0Bbdwr', // Cruel Summer - Taylor Swift
    '0VjIjW4GlUZAMYd2vXMi3b', // Blinding Lights - The Weeknd
    '11dFghVXANMlKmJXsNCbNl', // Shape of You - Ed Sheeran
    '6habFhsOp2NvshLv26DqMb', // Someone You Loved - Lewis Capaldi
    '0tgVpDi06FyKpA1z0VMD4v', // Perfect - Ed Sheeran
    '2Fxmhks0bxGSBdJ92vM42m', // Bad Habits - Ed Sheeran
    '4iV5W9uYEdYUVa79Axb7Rh', // Watermelon Sugar - Harry Styles
    '0sf4nGXJwWPEQzOG8bnWKF', // Anti-Hero - Taylor Swift
    '1r9xUipOqoNwggBpENDsvJ', // Don't Start Now - Dua Lipa
    '6UelLqGlWMcVH1E5c4H7lY', // Levitating - Dua Lipa
    '4w8niZpiMy6qz1mntFA5uM', // Good 4 U - Olivia Rodrigo
    '1McMsnEElThX1knmY9oliG', // Sunflower - Post Malone & Swae Lee
  ];

  const accessToken = await getAccessToken();

  const response = await fetch(`${baseUrl}/tracks?market=US&ids=${trackIds.join(',')}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });

  if (response.ok) {
    const data = await response.json();
    return data.tracks.filter((track: Track) => track !== null);
  } else {
    throw new Error('Failed to fetch popular songs');
  }
};

export const searchTrack = async (query: string): Promise<Track[]> => {
  const accessToken = await getAccessToken();

  const response = await fetch(`${baseUrl}/search?q=${encodeURIComponent(query)}&type=track&market=US&limit=20`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });

  if (response.ok) {
    const data: SearchResponse = await response.json();
    return data.tracks.items;
  } else {
    throw new Error('Failed to search tracks');
  }
};

export const getFeaturedPlaylists = async (): Promise<Playlist[]> => {
  const accessToken = await getAccessToken();

  const response = await fetch(`${baseUrl}/browse/featured-playlists?market=US&limit=10`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });

  if (response.ok) {
    const data = await response.json();
    return data.playlists.items;
  } else {
    throw new Error('Failed to fetch featured playlists');
  }
};

export const getNewReleases = async (): Promise<Album[]> => {
  const accessToken = await getAccessToken();

  const response = await fetch(`${baseUrl}/browse/new-releases?market=US&limit=10`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });

  if (response.ok) {
    const data = await response.json();
    return data.albums.items;
  } else {
    throw new Error('Failed to fetch new releases');
  }
};

export const getRecommendations = async (seedTracks?: string[]): Promise<Track[]> => {
  const accessToken = await getAccessToken();
  
  // Default seed tracks if none provided
  const defaultSeeds = ['7ouMYWpwJ422jRcDASZB7P', '4VqPOruhp5EdPBeR92t6lQ', '2takcwOaAZWiXQijPHIx7B'];
  const seeds = seedTracks || defaultSeeds;
  
  const response = await fetch(`${baseUrl}/recommendations?seed_tracks=${seeds.slice(0, 5).join(',')}&market=US&limit=20`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });

  if (response.ok) {
    const data = await response.json();
    return data.tracks;
  } else {
    throw new Error('Failed to fetch recommendations');
  }
};

// Utility function to format duration
export const formatDuration = (durationMs: number): string => {
  const minutes = Math.floor(durationMs / 60000);
  const seconds = Math.floor((durationMs % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

// Utility function to get default image
export const getImageUrl = (images: Image[], defaultUrl = '/default-album-cover.jpg'): string => {
  return images && images.length > 0 ? images[0].url : defaultUrl;
};