import { IProductView } from "../model/ProductView.ts";

export function productExist(id: number, productList: IProductView[]): boolean {
    return !!productList.find((product) => product.id === id);
}
