export interface Review{
    author_details: Author,
    content: string,
    updated_at?: string,
    movieTitle: string,
    movieId: number
}
export interface Author{
    id: number,
    name: string,
    avatar_path?: string,
    rating: number
}