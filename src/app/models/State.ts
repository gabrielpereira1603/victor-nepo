export interface State {
    id: number;
    name: string;
    slug: string;
    created_at: string;
    updated_at: string;
    deleted_at?: string | null;
}