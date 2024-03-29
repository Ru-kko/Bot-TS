

export interface application_response {
  code?: String;
  error?: number | string;
}

export interface animeInf {
  mal_id: number;
  url: string;
  images: {
    jpg: {
      image_url: string;
    }
  };
  title: string
  titles: {
    type: string
    title: string
  }[];
  airing: boolean;
  aired: {
    from: string;
    to: string
  };
  synopsis: string;
  type: "TV" | "OVA" | "Movie" | "Special" | "ONA" | "Music";
  episodes: number;
  score: number;
  start_date: string | null;
  end_date: string | null;
  members: number;
  rated: string;
}

export interface textBoxOptions {
  x: number;
  y: number;
  width: number;
  rows: number;
  textSize?: number;
  color?: string;
}
