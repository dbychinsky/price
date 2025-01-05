import { useEffect, useState } from "react";
import { Service } from './service/Service.ts';
import { ProductEntryForm } from './components/productEntryForm/ProductEntryForm.tsx';
import styles from './App.module.css';
import { ProductList } from "./components/productList/ProductList.tsx";
import { Toast } from "./components/toast/Toast.tsx";
import { Header } from "./components/header/Header.tsx";
import { IProductStorage } from "./model/ProductStorage.ts";
import { productExist } from "./utils/productExist.ts";
import { toast } from "react-toastify";
import { MessageList } from "./components/infoPanel/MessageList.ts";
import { IProductResponse } from "./model/ProductResponse.ts";

export const server = new Service();

function App() {
    const [productList, setProductList] = useState<IProductStorage[]>([]);
    const [productUrl, setProductUrl] = useState<string>('');

    useEffect(() => {
        server.loadProduct().then((response) => (
            setProductList(response)
        ))
    }, []);

    useEffect(() => {
        console.log(1)
    }, []);

    return (
        <div className={styles.app}>
            <button onClick={() => setProductUrl('https://www.wildberries.by/catalog/143878721/detail.aspx?targetUrl=SN')}>1</button>
            <button onClick={() => setProductUrl('https://www.wildberries.by/catalog/224283509/detail.aspx')}>1</button>
            <button onClick={() => setProductUrl('https://www.wildberries.by/catalog/113178628/detail.aspx')}>2</button>
            <button onClick={() => setProductUrl('https://www.wildberries.by/catalog/144299547/detail.aspx')}>3</button>
            <Header/>
            <ProductEntryForm
                url={productUrl}
                setUrl={setProductUrl}
                addProductToList={addProductToList}
            />
            <ProductList
                productList={productList}
                deleteProduct={deleteProduct}
            />
            <Toast/>
        </div>
    )

    function addProductToList() {
        server.getProduct(getIdFromUrl(productUrl))
            .then(response =>
                productExist(response.id, productList)
                    ? toast.error(MessageList.ERROR_PRODUCT_EXISTS)
                    : saveData(response)
            )
            .catch(() => toast.error(MessageList.ERROR_PRODUCT_ADD))
            .finally(() => setProductUrl(''));
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
            // price: productResponse.sizes[0].price.total
        }
    }

    function getIdFromUrl(url: string) {
        return url.slice(35).split('/')[0];
    }

    function deleteProduct(id: number) {
        const filteredProducts = productList.filter((product) => product.id !== id);
        setProductList(filteredProducts);
        server.deleteProduct(id).then();
    }
}

export default App
