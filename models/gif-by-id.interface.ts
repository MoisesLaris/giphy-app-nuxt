import { Meta } from "./meta.interface";
import { Gif } from "./gif.interface";

export interface GifByID {
    data: Gif;
    meta: Meta;
}