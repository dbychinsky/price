import { IProductLink } from "../model/ProductLink.ts";

/**
 * Получение ссылки для перехода на сайт маркетплейса.
 */
export function getUrlMarketplace(urlList: IProductLink[], id: number): string {
    let baseUrl = urlList.find((url) => url.id === id)?.url

    return baseUrl ? baseUrl : ''
}

export class GetUrlToMarketplace {

    static getCutUrlMarketplace(url: string): string {
        const result = url.split(" ").pop();

        return result ? result : '';
    }

    static getUrl(url: string): string {
        if (url.includes('global')) {
            return this.getUrlMarketplaceGlobal(url);
        } else {
            return this.getUrlMarketplaceBase(url);
        }
    }

    //Глобальный сайт
    private static getUrlMarketplaceGlobal(url: string): string {
        let result: string | undefined;

        if (url.includes('?')) {
            result = url.split('?')[0].split("-").pop();
        } else {
            result = url.split("-").pop();
        }

        return result ? result : '';
    }

    //Региональный сайт (by)
    private static getUrlMarketplaceBase(url: string) {
        return url.slice(35).split('/')[0];
    }
}