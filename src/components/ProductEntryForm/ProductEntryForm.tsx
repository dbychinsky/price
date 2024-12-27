import styles from './ProductEntryForm.module.css';
import { IProduct } from '../../model/Product.ts';

import { server } from '../../App.tsx';

interface ProductEntryFormProps {
    setReturnData: (response: IProduct) => void
    url: string;
    setUrl: (url: string) => void;
}

export const ProductEntryForm = (props: ProductEntryFormProps) => {
    const {
        setReturnData,
        url,
        setUrl
    } = props;

    return (
        <div className={styles.productEntryForm}>
            <input
                value={url}
                onChange={(value) => setUrlValue(value.target.value)}/>

            <button onClick={getData}>Добавить в список</button>
        </div>
    );

    function setUrlValue(value: string) {
        setUrl(value);
    }

    function getIdFromUrl(url: string) {
        return url.slice(35).split('/')[0];
    }

    async function getData() {
        server.getProduct(getIdFromUrl(url))
            .then(response => setReturnData(response));
    }
};
