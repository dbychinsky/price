export interface IProductCurrency {
    id: string,
    name: string,
}

export enum SelectCurrencyListId {
    rub = 'rub',
    byn = 'byn',
    kzt = 'kzt'
}

export enum SelectCurrencyListName {
    rub = 'RUB',
    byn = 'BYN',
    kzt = 'KZT'
}

export const currencyList: IProductCurrency[] = [
    {id: SelectCurrencyListId.byn, name: SelectCurrencyListName.byn},
    {id: SelectCurrencyListId.rub, name: SelectCurrencyListName.rub},
    {id: SelectCurrencyListId.kzt, name: SelectCurrencyListName.kzt},
];