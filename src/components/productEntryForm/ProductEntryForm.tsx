import './ProductEntryForm.scss';
import { SelectCurrency } from "../selectCurrency/SelectCurrency.tsx";
import { IProductCurrency } from "../../model/Currency.ts";
import { Button } from "../button/Button.tsx";

interface ProductEntryFormProps {
    url: string;
    setUrl: (url: string) => void;
    addProductToList: () => void;
    currentCurrency: IProductCurrency | null;
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
        <div className='productEntryForm'>
            <div>
                <label>Укажите ссылку на товар</label>
                <SelectCurrency
                    setCurrentLanguage={setCurrentLanguage}
                    currentLanguage={currentCurrency}/>
            </div>
            <input
                value={url}
                onChange={(value) => setUrl(value.target.value)}/>
            <Button
                text={'Добавить в список'}
                onClick={addProductToList}
                variant={'primary'}/>
        </div>
    );

};
