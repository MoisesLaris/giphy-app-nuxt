export interface TrendingOptions {
    limit: number;
    rating: Rating;
}

export enum Rating {
    G = "g",
    PG = "pg",
    PG13 = "pg-13",
    R = "r"
}