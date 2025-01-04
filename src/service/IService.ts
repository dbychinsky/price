import { IProductResponse } from '../model/ProductResponse.ts';
import { IProductStorage } from "../model/ProductStorage.ts";

export interface IService {
    /**
     * @description Получение данных о товаре.
     */
    getProduct(productId: string): Promise<IProductResponse>;

    /**
     * @description Сохранение данных о товаре.
     */
    saveProduct(product: IProductStorage): void;
}