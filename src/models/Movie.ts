
export interface Movie
{
    id: number,
    title: string,
    overview: string,
    release_date: string,
    poster_path: string,
    backdrop_path: string,
    vote_average: number,
    vote_count: number,
    genres: Genre[],
    budget: number,
    revenue: number,
    popularity: number,
    runtime: number
}
export interface Genre{
    id: number,
    name: string
}