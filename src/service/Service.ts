import { IProductResponse } from '../model/ProductResponse.ts';
import { IService } from './IService.ts';
import { IProductStorage } from "../model/ProductStorage.ts";

const apiUrl = import.meta.env.VITE_SERVER_URL;

export class Service implements IService {
    private PRODUCT_LIST_KEY = 'PRODUCT_LIST_KEY';

    /**
     * @description  Получение списка продуктов c wb.
     */
    async getProduct(productId: string): Promise<IProductResponse> {
        return await fetch(`${apiUrl}?id=${productId}`)
            .then(function (response) {
                return response.json();
            })
    }

    /**
     * @description  Получение списка продуктов из lh.
     */
    async loadProduct() {
        return await this.loadStorage(this.PRODUCT_LIST_KEY);
    }

    /**
     * @description  Сохранение списка продуктов.
     */
    async saveProduct(product: IProductStorage) {
        let productList: IProductStorage[] = this.loadStorage(this.PRODUCT_LIST_KEY);

        productList.push(product);
        this.saveStorage(this.PRODUCT_LIST_KEY, productList);
    }

    /**
     * @description  Удаление из списка продуктов из lh.
     */
    async deleteProduct(id: number) {
        let productList: IProductStorage[] = await this.loadStorage(this.PRODUCT_LIST_KEY);
        this.saveStorage(this.PRODUCT_LIST_KEY, productList.filter((product) => product.id !== id));
    }

    /**
     * Метод для работы с localStorage - сохранение данных
     */
    private saveStorage(key: string, object: IProductStorage[]) {
        localStorage.setItem(key, JSON.stringify(object));
    }

    /**
     * Метод для работы с localStorage - загрузка данных
     */
    private loadStorage(key: string) {
        const result = JSON.parse(localStorage.getItem(key)!);

        if (result === null) {
            return []
        }
        return result;
    }
}
