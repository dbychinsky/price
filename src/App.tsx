import { useEffect, useState } from "react";
import { Service } from './service/Service.ts';
import { ProductEntryForm } from './components/productEntryForm/ProductEntryForm.tsx';
import styles from './App.module.css';
import { ProductList } from "./components/productList/ProductList.tsx";
import { Toast } from "./components/toast/Toast.tsx";
import { Header } from "./components/header/Header.tsx";
import { IProductStorage } from "./model/ProductStorage.ts";

export const server = new Service();

function App() {
    const [productList, setProductList] = useState<IProductStorage[]>([]);
    const [productUrl, setProductUrl] = useState<string>('');

    useEffect(() => {
        server.loadProduct().then((response) => (
            setProductList(response)
        ))
    }, [])

    return (
        <div className={styles.app}>
            <button onClick={() => setProductUrl('https://www.wildberries.by/catalog/224283509/detail.aspx')}>1</button>
            <button onClick={() => setProductUrl('https://www.wildberries.by/catalog/113178628/detail.aspx')}>2</button>
            <button onClick={() => setProductUrl('https://www.wildberries.by/catalog/144299547/detail.aspx')}>3</button>
            <Header/>
            <ProductEntryForm
                productList={productList}
                setProductList={setProductList}
                url={productUrl}
                setUrl={setProductUrl}/>
            <ProductList
                productList={productList}
                deleteProduct={deleteProduct}
            />
            <Toast/>
        </div>)

    function deleteProduct(id: number) {
        const filteredProducts = productList.filter((product) => product.id !== id);
        setProductList(filteredProducts);
        server.deleteProduct(id).then();
    }
}

export default App
