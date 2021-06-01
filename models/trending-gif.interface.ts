import { Gif } from "./gif.interface";
import { Meta } from "./meta.interface";

export interface TrendingGif {
    data:       Gif[];
    pagination: Pagination;
    meta:       Meta;
}

export interface Pagination {
    total_count: number;
    count:       number;
    offset:      number;
}
