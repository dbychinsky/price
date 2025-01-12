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
import { Serialize } from "./utils/Serialize.ts";
import { getIdFromUrl } from "./utils/GetIdFromUrl.ts";
import { IProductView } from "./model/ProductView.ts";
import { IProductStorage } from "./model/ProductStorage.ts";
import { productExist } from "./utils/ProductExist.ts";
import FakeButtons from "./components/fakeButtons/FakeButtons.tsx";
import { IProductCurrency, SelectCurrencyListId, SelectCurrencyListName } from "./model/Currency.ts";

export const service = new Service();

/**
 * @function addProductToList - Добавление в список продуктов. Получаем данные
 * с сервера WB и помещаем в список отображения и сохраняем в LS.
 *
 * @function deleteProduct - Удаляет продукт из списка.
 *
 * @function convertProductsToViewFromStorage - Получает на вход список id и текущую
 * валюту, формирует на основании запрошенных данных с WB в ответе список для
 * сохранения в LS.
 *
 * @function saveProduct - Сохраняет продукт в LS. Используется после добавления
 * подукта из списка.
 *
 * @function saveProductList - Сохраняет список продуктов в LS. Испольузется
 * после изменения валюты.
 */
function App() {
    const initialCurrentCurrency: IProductCurrency = {
        id: SelectCurrencyListId.byn,
        name: SelectCurrencyListName.byn,
    }

    const [productList, setProductList] = useState<IProductView[]>([]);
    const [currentCurrency, setCurrentCurrency] = useState<IProductCurrency>(initialCurrentCurrency);
    const [productUrl, setProductUrl] = useState<string>('');

    useEffect(() => {
        service.loadCurrencyFromLocalStorage()
            .then((response) =>
                response.id
                    ? setCurrentCurrency(response)
                    : service.saveCurrencyToLocalStorage(initialCurrentCurrency)
            )
            .catch((error) => console.log(error, 'Не удалось загрузить данные loadCurrency'));
    }, []);

    useEffect(() => {
        let productStorageList: IProductStorage[];

        service.loadProductFromLocalStorage()
            .then((responseProductList: IProductStorage[]) => {
                    productStorageList = responseProductList;

                    convertProductsToViewFromStorage(productStorageList)
                        .then((responseProductViewList: IProductView[]) =>
                            setProductList(responseProductViewList))
                        .catch((error) => console.log(error, 'Не удалось загрузить данные convertProductsToViewFromStorage'))
                }
            )
            .then(() => saveProductList(productStorageList))
            .catch((error) => console.log(error, 'Не удалось загрузить данные loadProduct'));
    }, [currentCurrency]);

    return (
        <div className={styles.app}>
            <FakeButtons setProductUrl={setProductUrl}/>
            <Header/>
            <ProductEntryForm
                url={productUrl}
                setUrl={setProductUrl}
                addProductToList={addProductToList}
                currentCurrency={currentCurrency}
                setCurrentLanguage={setCurrentCurrency}
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
        service.getProductFromWB(Number(getIdFromUrl(productUrl)), currentCurrency)
            .then(response =>
                productExist(response.id, productList)
                    ? toast.error(MessageList.ERROR_PRODUCT_EXISTS)
                    : saveProduct(response)
            )
            .catch(() => toast.error(MessageList.ERROR_PRODUCT_ADD))
            .finally(() => setProductUrl(''));
    }

    function deleteProduct(id: number) {
        const filteredProducts = productList.filter((product) => product.id !== id);
        setProductList(filteredProducts);
        service.deleteProductFromLocalStorage(id).then();
    }

    async function convertProductsToViewFromStorage(idList: IProductStorage[]): Promise<IProductView[]> {
        let productStorageList: IProductView[] = [];

        for (const item of idList) {
            const product = await service.getProductFromWB(item.id, currentCurrency);
            productStorageList.push(Serialize.responseToView(product))
        }

        return productStorageList
    }


    function saveProduct(response: IProductResponse) {
        const productConvertedView =
            Serialize.responseToView(response);
        setProductList([... productList, productConvertedView]);
        service.saveProductToLocalStorage(Serialize.responseToStorage(response)).then();
    }

    async function saveProductList(productList: IProductStorage[]) {
        let productStoragesList: IProductStorage[] = [];

        for (const item of productList) {
            const product = await service.getProductFromWB(item.id, currentCurrency);
            productStoragesList.push(Serialize.responseToStorage(product));
        }

        service.saveProductListToLocalStorage(productStoragesList).then();
    }

}

export default App
