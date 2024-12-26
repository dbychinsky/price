import { IProduct } from '../model/Product.ts';
import { IService } from './IService.ts';

const apiUrl = import.meta.env.VITE_SERVER_URL;

export class Service implements IService {
    /**
     * @description  Получение списка контактов.
     */
    async getProduct(productId: string): Promise<IProduct> {
        return await fetch(`${apiUrl}?id=${productId}`)
            .then((response: Response) => response.json());
    }
}