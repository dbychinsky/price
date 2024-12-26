import { IProduct } from '../model/Product.ts';

export interface IService {
    /**
     * @description Получение данных о товаре.
     */
    getProduct(productId: string): Promise<IProduct>;
}