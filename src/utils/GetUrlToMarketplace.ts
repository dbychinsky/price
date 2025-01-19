/**
 * Получение ссылки для перехода на сайт маркетплейса.
 */
export function getUrlMarketplace(id: number): string {
    const baseUrl = `https://www.wildberries.by/catalog/${id.toString()}/detail.aspx?targetUrl=EX`
    // const additionalUrl = `https://www.wildberries.by/catalog/${product.id}/detail.aspx?targetUrl=SN&size=${product.id}`

    return baseUrl
}