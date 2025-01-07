import { IProductResponse } from '../model/ProductResponse.ts';
import { IProductStorage } from "../model/ProductStorage.ts";
import { IProductCurrency } from "../model/Currency.ts";

const apiUrl = import.meta.env.VITE_SERVER_URL;

export class Service {
    private PRODUCT_LIST_KEY = 'PRODUCT_LIST_KEY';
    private CURRENCY_KEY = 'CURRENCY_KEY';

    /**
     * @description  Получение списка продуктов c wb.
     */
    async getProduct(productId: number): Promise<IProductResponse> {
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
    async deleteProduct(idProduct: number) {
        let productList: IProductStorage[] = await this.loadStorage(this.PRODUCT_LIST_KEY);

        this.saveStorage(this.PRODUCT_LIST_KEY, productList.filter((product) => product.id !== idProduct));
    }

    /**
     * @description Сохранение выбранного типа валюты.
     */
    async saveCurrency(currency: IProductCurrency) {
        this.saveStorage(this.CURRENCY_KEY, currency);
    }

    /**
     * @description Сохранение выбранного типа валюты.
     */
    async loadCurrency(): Promise<IProductCurrency> {
        return await this.loadStorage(this.CURRENCY_KEY);
    }

    /**
     * Метод для работы с localStorage - сохранение данных
     */
    private saveStorage(key: string, object: IProductStorage[] | IProductCurrency) {
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
