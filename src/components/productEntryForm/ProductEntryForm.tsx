import styles from './ProductEntryForm.module.css';
import { SelectCurrency } from "../selectCurrency/SelectCurrency.tsx";
import { IProductCurrency } from "../../model/Currency.ts";

interface ProductEntryFormProps {
    url: string;
    setUrl: (url: string) => void;
    addProductToList: () => void;
    currentCurrency: IProductCurrency;
    setCurrentLanguage: (value: IProductCurrency) => void;
}

export const ProductEntryForm = (props: ProductEntryFormProps) => {
    const {
        url,
        setUrl,
        addProductToList,
        currentCurrency,
        setCurrentLanguage,
    } = props;

    return (
        <div className={styles.productEntryForm}>
            <div>
                <label>Укажите ссылку на товар</label>
                <SelectCurrency
                    setCurrentLanguage={setCurrentLanguage}
                    currentLanguage={currentCurrency}/>
            </div>
            <input
                value={url}
                onChange={(value) => setUrl(value.target.value)}/>

            <button onClick={addProductToList}>Добавить в список</button>
        </div>
    );

};
