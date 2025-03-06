declare module '../services/api' {

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

    export interface Album {
        album_type: string;
        total_tracks: number;
        available_markets: string[];
        external_urls: ExternalUrls;
        href: string;
        id: string;
        images: { url: string; height: number; width: number }[];
        name: string;
        release_date: string;
        release_date_precision: string;
        restrictions?: { reason: string };
        type: string;
        uri: string;
        artists: Artist[];
    }

    export interface ExternalIds {
        isrc: string;
        ean: string;
        upc: string;
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
        // Convenience fields for UI components
        url?: string; // Extracted from album.images[0].url for album cover
    }

    export function getPopularTracks(): Promise<Track[]>;

    export function searchTrack(query: string): Promise<Track[]>;
}
