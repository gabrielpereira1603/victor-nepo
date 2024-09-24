export interface City {
    id: number;
    name: string;
    slug: string;
    state_id: number;
    created_at: string;
    updated_at: string;
    deleted_at?: string | null;
}