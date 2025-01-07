import { IProductPrice } from "./ProductView.ts";

export interface IProductStorage {
    id: number,
    price: IProductPrice[],
}
