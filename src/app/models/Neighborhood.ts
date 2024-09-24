export interface Neighborhood {
    id: number;
    name: string;
    slug: string;
    city_id: number;
    created_at: string;
    updated_at: string;
    deleted_at?: string | null;
}
