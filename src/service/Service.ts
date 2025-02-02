import { IProductResponse } from '../model/ProductResponse.ts';
import { IProductStorage } from "../model/ProductStorage.ts";
import { IProductCurrency } from "../model/Currency.ts";
import { IProductLink } from "../model/ProductLink.ts";

const apiUrl = import.meta.env.VITE_SERVER_URL;

export class Service {
    private PRODUCT_LIST_KEY = 'PRODUCT_LIST_KEY';
    private PRODUCT_URL_LIST_KEY = 'PRODUCT_URL_LIST_KEY';
    private CURRENCY_KEY = 'CURRENCY_KEY';

    /**
     * @description  Получение списка продуктов c WB.
     */
    async getProductFromWB(productId: number, currency: IProductCurrency | null): Promise<IProductResponse> {
        try {
            const response =
                await fetch(`${apiUrl}?id=${productId}&currency=${currency?.id}`);

            if (!response.ok) {
                throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Ошибка при выполнении запроса:', error);
            throw error; // Пробрасываем ошибку дальше
        }
    }

    /**
     * @description  Получение списка продуктов из LS.
     */
    async loadProductFromLocalStorage(): Promise<IProductStorage[]> {
        return await this.load(this.PRODUCT_LIST_KEY);
    }

    /**
     * @description  Сохранение продукта в список в LS.
     */
    async saveProductToLocalStorage(product: IProductStorage) {
        let productList: IProductStorage[] = this.load(this.PRODUCT_LIST_KEY);

        productList.push(product);
        this.save(this.PRODUCT_LIST_KEY, productList);
    }

    /**
     * @description  Сохранение списка продуктов в LS.
     */
    async saveProductListToLocalStorage(productList: IProductStorage[]) {
        this.save(this.PRODUCT_LIST_KEY, productList);
    }

    /**
     * @description  Удаление из списка продуктов из LS.
     */
    async deleteProductFromLocalStorage(idProduct: number) {
        let productList: IProductStorage[] = await this.load(this.PRODUCT_LIST_KEY);

        this.save(this.PRODUCT_LIST_KEY, productList.filter((product) => product.id !== idProduct));
    }

    /**
     * @description Сохранение выбранного типа валюты.
     */
    async saveCurrencyToLocalStorage(currency: IProductCurrency) {
        this.save(this.CURRENCY_KEY, currency);
    }

    /**
     * @description Загрузка выбранного типа валюты.
     */
    async loadCurrencyFromLocalStorage(): Promise<IProductCurrency> {
        return await this.load(this.CURRENCY_KEY);
    }

    /**
     * @description Сохранение ссылки на товар.
     */
    async saveLinkToLocalStorage(productLinkList: IProductLink) {
        let productUrlList: IProductLink[] = this.load(this.PRODUCT_URL_LIST_KEY);

        productUrlList.push(productLinkList);

        this.save(this.PRODUCT_URL_LIST_KEY, productUrlList);
    }

    /**
     * @description Загрузка выбранного типа валюты.
     */
    async loadLinkToLocalStorage(): Promise<IProductLink[]> {
        return await this.load(this.PRODUCT_URL_LIST_KEY);
    }

    /**
     * Метод для работы с localStorage - сохранение данных
     */
    private save(key: string, object: IProductStorage[] | IProductCurrency | IProductLink[]) {
        localStorage.setItem(key, JSON.stringify(object));
    }

    /**
     * Метод для работы с localStorage - загрузка данных
     */
    private load(key: string) {
        const result = JSON.parse(localStorage.getItem(key)!);

        if (result === null) {
            return []
        }
        return result;
    }
}
