export interface application_response {
    code?: String;
    error?: number | string;
}
export interface animeInf {
    mal_id: number;
    url: string;
    image_url: string;
    title: string;
    airing: boolean;
    synopsis: string;
    type: 'TV' | 'OVA' | 'Movie' | 'Special' | 'ONA' | 'Music';
    episodes: number;
    score: number;
    start_date: string | null;
    end_date: string | null;
    members: number;
    rated: string;
}