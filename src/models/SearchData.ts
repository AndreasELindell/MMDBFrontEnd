import { Movie } from "./Movie";

export interface SearchData 
{
    movies: Movie[],
    pageData: PageData
}

export interface PageData{
    total_pages: number,
    total_results: number
}