import { Subcategory } from "../subcategory/subcategory";

export class Category {
    id: number;
    name: string;
    transactionSubcategories: Subcategory[];
    subcategories: Subcategory[];
}
