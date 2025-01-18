import styles from './SelectCurrency.module.css';
import { ChangeEvent } from "react";
import { currencyList, IProductCurrency } from "../../model/Currency.ts";
import { service } from "../../App.tsx";

interface SelectCurrencyProps {
    currentLanguage: IProductCurrency | null;
    setCurrentLanguage: (value: IProductCurrency) => void;
}


export function SelectCurrency(props: SelectCurrencyProps) {
    const {
        currentLanguage,
        setCurrentLanguage,
    } = props;

    return (
        <select
            onChange={changeHandler}
            name='SelectCurrency'
            value={currentLanguage?.name}
            className={styles.inputSelect}>
            <>
                {currencyList.map((item) => (
                    <option key={item.id} value={item.name}>
                        {item.name}
                    </option>
                ))}
            </>

        </select>
    );

    function changeHandler(event: ChangeEvent<HTMLSelectElement>) {
        const target: IProductCurrency | undefined = currencyList.find((currency) =>
            currency.name === event.target.value)
        if (target) {
            setCurrentLanguage(target);
            service.saveCurrencyToLocalStorage(target).then();
        }
    }

}
