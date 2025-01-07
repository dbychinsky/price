import { useEffect, useState } from "react";
import { Service } from './service/Service.ts';
import { ProductEntryForm } from './components/productEntryForm/ProductEntryForm.tsx';
import styles from './App.module.css';
import { ProductList } from "./components/productList/ProductList.tsx";
import { Toast } from "./components/toast/Toast.tsx";
import { Header } from "./components/header/Header.tsx";
import { toast } from "react-toastify";
import { MessageList } from "./components/infoPanel/MessageList.ts";
import { IProductResponse } from "./model/ProductResponse.ts";
import { ConvertResponse } from "./utils/ConvertResponse.ts";
import { getIdFromUrl } from "./utils/GetIdFromUrl.ts";
import { IProductView } from "./model/ProductView.ts";
import { IProductStorage } from "./model/ProductStorage.ts";
import { productExist } from "./utils/ProductExist.ts";
import FakeButtons from "./components/fakeButtons/FakeButtons.tsx";
import { IProductCurrency } from "./model/Currency.ts";

export const service = new Service();

function App() {
    const [productList, setProductList] = useState<IProductView[]>([]);
    const [currentLanguage, setCurrentLanguage] = useState<IProductCurrency | undefined>(undefined);
    const [productUrl, setProductUrl] = useState<string>('');

    // Получаем список из LS и передаем его в запросы
    useEffect(() => {
        service.loadProduct()
            .then((response: IProductStorage[]) =>
                getPrices(response)
                    .then((response) =>
                        setProductList(response)
                    )
            );
    }, []);

    useEffect(() => {
        service.loadCurrency()
            .then((response) => setCurrentLanguage(response))
    }, []);

    return (
        <div className={styles.app}>
            <FakeButtons setProductUrl={setProductUrl}/>
            <div>{currentLanguage && currentLanguage.name}</div>
            <Header/>
            <ProductEntryForm
                url={productUrl}
                setUrl={setProductUrl}
                addProductToList={addProductToList}
                currentLanguage={currentLanguage}
                setCurrentLanguage={setCurrentLanguage}
            />
            <ProductList
                productList={productList}
                setProductList={setProductList}
                deleteProduct={deleteProduct}
            />
            <Toast/>
        </div>
    )

    function addProductToList() {
        service.getProduct(Number(getIdFromUrl(productUrl)))
            .then(response =>
                productExist(response.id, productList)
                    ? toast.error(MessageList.ERROR_PRODUCT_EXISTS)
                    : saveData(response)
            )
            .catch(() => toast.error(MessageList.ERROR_PRODUCT_ADD))
            .finally(() => setProductUrl(''));
    }

    function saveData(response: IProductResponse) {
        const productConvertedView = ConvertResponse.convertResponseToView(response);
        setProductList([... productList, productConvertedView]);
        service.saveProduct(ConvertResponse.convertResponseToStorage(response)).then()
    }

    function deleteProduct(id: number) {
        const filteredProducts = productList.filter((product) => product.id !== id);
        setProductList(filteredProducts);
        service.deleteProduct(id).then();
    }

    async function getPrices(idList: IProductStorage[]) {
        let result: IProductView[] = [];

        for (const item of idList) {
            const temp = await service.getProduct(item.id);
            result.push(ConvertResponse.convertResponseToView(temp))

        }
        return result
    }

}

export default App
