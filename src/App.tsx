import { useEffect, useState } from "react";
import { Service } from './service/Service.ts';
import { ProductEntryForm } from './components/productEntryForm/ProductEntryForm.tsx';
import './App.scss';
import { ProductList } from "./components/productList/ProductList.tsx";
import { Toast } from "./components/toast/Toast.tsx";
import { toast } from "react-toastify";
import { MessageList } from "./components/infoPanel/MessageList.ts";
import { IProductResponse } from "./model/ProductResponse.ts";
import { Serialize } from "./utils/Serialize.ts";
import { IProductView } from "./model/ProductView.ts";
import { IProductStorage } from "./model/ProductStorage.ts";
import { productExist } from "./utils/ProductExist.ts";
import { IProductCurrency, SelectCurrencyListId, SelectCurrencyListName } from "./model/Currency.ts";
import { Footer } from "./components/footer/Footer.tsx";
import { GetUrlToMarketplace } from "./utils/GetUrlToMarketplace.ts";
import { IProductLink } from "./model/ProductLink.ts";
import FakeButtons from "./components/fakeButtons/FakeButtons.tsx";
import { Header } from "./components/header/Header.tsx";
import { Loading } from "./components/loading/Loading.tsx";

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
    const [currentCurrency, setCurrentCurrency] = useState<IProductCurrency | null>(null);
    const [productUrl, setProductUrl] = useState<string>('');
    const [productUrlList, setProductUrlList] = useState<IProductLink[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        service.loadCurrencyFromLocalStorage()
            .then((response) =>
                response.id
                    ? setCurrentCurrency(response)
                    : (
                        service.saveCurrencyToLocalStorage(initialCurrentCurrency),
                            setCurrentCurrency(initialCurrentCurrency)
                    )
            )
            .catch((error) => console.log(error, 'Не удалось загрузить данные loadCurrency'));
    }, []);

    useEffect(() => {
        let productStorageList: IProductStorage[];
        if (currentCurrency !== null) {
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
        }
    }, [currentCurrency]);

    useEffect(() => {
        service.loadLinkToLocalStorage()
            .then((response: IProductLink[]) => {
                setProductUrlList(response)
            })
    }, [productUrl]);

    return (
        <div className={"app"}>
            <div className='wrapper'>
                <FakeButtons setProductUrl={setProductUrl}/>
                <Header/>
                <ProductEntryForm
                    url={productUrl}
                    setUrl={setProductUrl}
                    addProductToList={addProductToList}
                    currentCurrency={currentCurrency}
                    setCurrentLanguage={setCurrentCurrency}
                    isLoading={isLoading}
                />
                <ProductList
                    productList={productList}
                    productUrlList={productUrlList}
                    deleteProduct={deleteProduct}
                />
                {isLoading && <Loading/>}
                <Toast/>
            </div>
            <Footer/>
        </div>
    )

    function addProductToList() {
        const productUrlCut = GetUrlToMarketplace.getCutUrlMarketplace(productUrl);
        const productId = Number(GetUrlToMarketplace.getUrl(productUrlCut))
        const productLinkToWb: IProductLink = {id: productId, url: productUrlCut}

        if (productUrlCut !== '') {
            setIsLoading(true);
            service.getProductFromWB(productId, currentCurrency)
                .then(response =>
                    productExist(response.id, productList)
                        ? toast.error(MessageList.ERROR_PRODUCT_EXISTS)
                        : saveProduct(response, productLinkToWb)
                )
                // .then(() => service.saveLinkToLocalStorage(productLinkToWb).then())
                .catch(() => toast.error(MessageList.ERROR_PRODUCT_ADD))
                .finally(
                    () => {
                        setProductUrl(''),
                            setIsLoading(false)
                    }
                );
        } else {
            toast.error(MessageList.ERROR_EMPTY_URL)
        }

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


    function saveProduct(response: IProductResponse, productLinkToWb: IProductLink) {
        const productConvertedView =
            Serialize.responseToView(response);
        setProductList([... productList, productConvertedView]);
        service.saveProductToLocalStorage(Serialize.responseToStorage(response)).then();
        service.saveLinkToLocalStorage(productLinkToWb).then();
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
