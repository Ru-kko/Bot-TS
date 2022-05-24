export interface guildsResponse {
    [id: string]: {
        name: string;
        icon?: string;
        owner: boolean;
        permissions: number;
        permissions_new: number;
        features: string[];
        haveBot?: boolean;
    }
}
