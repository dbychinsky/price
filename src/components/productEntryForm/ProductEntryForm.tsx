import styles from './ProductEntryForm.module.css';
import { IProductResponse } from '../../model/ProductResponse.ts';
import { server } from '../../App.tsx';
import { toast } from "react-toastify";
import { MessageList } from "../infoPanel/MessageList.ts";
import { IProductStorage } from "../../model/ProductStorage.ts";
import { productExist } from "../../utils/productExist.ts";

interface ProductEntryFormProps {
    productList: IProductStorage[];
    setProductList: (response: IProductStorage[]) => void;
    url: string;
    setUrl: (url: string) => void;
}

export const ProductEntryForm = (props: ProductEntryFormProps) => {
    const {
        productList,
        setProductList,
        url,
        setUrl
    } = props;

    return (
        <div className={styles.productEntryForm}>
            <label>Укажите ссылку на товар</label>
            <input
                value={url}
                onChange={(value) => setUrlValue(value.target.value)}/>

            <button onClick={addProductToList}>Добавить в список</button>
        </div>
    );

    function addProductToList() {
        server.getProduct(getIdFromUrl(url))
            .then(response =>
                productExist(response.id, productList)
                    ? toast.error(MessageList.ERROR_PRODUCT_EXISTS)
                    : saveData(response)
            )
            .catch(() => toast.error(MessageList.ERROR_PRODUCT_ADD))
            .finally(() => setUrl(''));
    }

    function saveData(response: IProductResponse) {
        const productConverted = convertResponseToView(response);

        setProductList([... productList, productConverted]);
        server.saveProduct(productConverted).then()
    }

    function convertResponseToView(productResponse: IProductResponse): IProductStorage {
        return {
            id: productResponse.id,
            name: productResponse.name,
            price: productResponse.sizes[0].price.total
        }
    }

    function setUrlValue(value: string) {
        setUrl(value);
    }

    function getIdFromUrl(url: string) {
        return url.slice(35).split('/')[0];
    }
};
