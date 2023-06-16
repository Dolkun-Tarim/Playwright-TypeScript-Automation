import { Category } from "./pet-category";
import { Tag } from "./pet-tag";

export interface Pet{
    id: number;
    category: Category;
    name: string;
    photoUrls: string[];
    tags: Tag[];
    status: string;

}