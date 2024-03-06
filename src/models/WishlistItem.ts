import { Movie } from "./Movie";

export interface WishlistItem 
{
    id: number,
    movie: Movie,
    userId: number,
    watched: boolean
}