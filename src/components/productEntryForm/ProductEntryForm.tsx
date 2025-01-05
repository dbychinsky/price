import styles from './ProductEntryForm.module.css';

interface ProductEntryFormProps {
    url: string;
    setUrl: (url: string) => void;
    addProductToList: () => void;
}

export const ProductEntryForm = (props: ProductEntryFormProps) => {
    const {
        url,
        setUrl,
        addProductToList
    } = props;

    return (
        <div className={styles.productEntryForm}>
            <label>Укажите ссылку на товар</label>
            <input
                value={url}
                onChange={(value) => setUrl(value.target.value)}/>

            <button onClick={addProductToList}>Добавить в список</button>
        </div>
    );

};
