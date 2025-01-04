import { IProductStorage } from "../model/ProductStorage.ts";

export function productExist(id: number, productList: IProductStorage[]): boolean {
    return !!productList.find((product) => product.id === id);
}