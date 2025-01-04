import { IProductResponse } from '../model/ProductResponse.ts';
import { IService } from './IService.ts';
import { IProductStorage } from "../model/ProductStorage.ts";

const apiUrl = import.meta.env.VITE_SERVER_URL;

export class Service implements IService {
    private PRODUCT_LIST_KEY = 'PRODUCT_LIST_KEY';

    /**
     * @description  Получение списка продуктов.
     */
    async getProduct(productId: string): Promise<IProductResponse> {
        return await fetch(`${apiUrl}?id=${productId}`)
            .then(function (response) {
                return response.json();
            })
    }

    /**
     * @description  Получение списка продуктов.
     */
    async loadProduct() {
        const result = await this.loadStorage(this.PRODUCT_LIST_KEY);
        if (result === null) {
            return []
        }
        return await result;
    }

    /**
     * @description  Сохранение списка продуктов.
     */
    async saveProduct(product: IProductStorage) {
        const productList = this.loadStorage(this.PRODUCT_LIST_KEY);

        productList.push(product);
        this.saveStorage('productList', productList);
    }

    /**
     * Метод для работы с localStorage - сохранение данных
     */
    private saveStorage(key: string, object: IProductStorage) {
        localStorage.setItem(key, JSON.stringify(object));
    }

    /**
     * Метод для работы с localStorage - загрузка данных
     */
    private loadStorage(key: string) {
        return JSON.parse(localStorage.getItem(key)!);
    }
}
