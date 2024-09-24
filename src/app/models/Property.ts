import {Neighborhood} from "@/app/models/Neighborhood";
import {City} from "@/app/models/City";
import {State} from "@/app/models/State";

export interface Property {
    id: number;
    photo_url: string | null;
    maps: string | null;
    value: string;
    bedrooms: number;
    bathrooms: number;
    suites: number;
    living_rooms: number;
    kitchens: number;
    parking_spaces: number;
    pools: number;
    built_area: string;
    land_area: string;
    neighborhood_id: number;
    city_id: number;
    state_id: number;
    created_at: string;
    updated_at: string;
    deleted_at?: string | null;
    neighborhood: Neighborhood;
    city: City;
    state: State;
}