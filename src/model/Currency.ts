export interface IProductCurrency {
    id: string,
    name: string,
}

export enum SelectCurrencyList {
    RUB = 'RUB',
    BYN = 'BYN',
    KZT = 'KZT'
}

export const currencyList: IProductCurrency[] = [
    {id: SelectCurrencyList.BYN, name: SelectCurrencyList.BYN},
    {id: SelectCurrencyList.RUB, name: SelectCurrencyList.RUB},
    {id: SelectCurrencyList.KZT, name: SelectCurrencyList.KZT},
];