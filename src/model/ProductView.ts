export interface IProductView {
    id: number,
    name: string,
    size: IProductSize[],
}

export interface IProductSize {
    name: string,
    origName: string,
    price: IProductPrice,
}

export interface IProductPrice {
    priceTotal: string | null,
    priceBasic: string | null,
}

