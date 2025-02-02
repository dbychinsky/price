import { IProductResponse } from "../model/ProductResponse.ts";
import { IProductStorage } from "../model/ProductStorage.ts";
import { IProductPrice, IProductSize, IProductView } from "../model/ProductView.ts";
import { getProductPriceFraction } from "./GetProductPriceFraction.ts";

/**
 * Конвертация данных ответа
 */
export class Serialize {

    static responseToStorage(productResponse: IProductResponse): IProductStorage {
        const price: IProductPrice[] = [];

        productResponse.sizes.map((item) => {
            price.push({
                priceBasic: item.price ? getProductPriceFraction(item.price.basic.toString()) : null,
                priceTotal: item.price ? getProductPriceFraction(item.price.total.toString()) : null,
                priceProduct: item.price ? getProductPriceFraction(item.price.product.toString()) : null
            });
        })

        return {
            id: productResponse.id,
            price
        }
    }

    static responseToView(productResponse: IProductResponse): IProductView {
        const size: IProductSize[] = [];

        productResponse.sizes.map((item) => {
            size.push({
                name: item.name,
                origName: item.origName,
                price: {
                    priceBasic: item.price ? getProductPriceFraction(item.price.basic.toString()) : null,
                    priceTotal: item.price ? getProductPriceFraction(item.price.total.toString()) : null,
                    priceProduct: item.price ? getProductPriceFraction(item.price.product.toString()) : null
                }
            });
        })

        return {
            id: productResponse.id,
            name: productResponse.name,
            size
        }
    }
}