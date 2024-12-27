import { useEffect, useState } from "react";
import { IProduct } from './model/Product.ts';
import { Service } from './service/Service.ts';
import { Product } from './components/Product/Product.tsx';
import { ProductEntryForm } from './components/ProductEntryForm/ProductEntryForm.tsx';
import styles from './App.module.css';
import { DeviceTypes, getDeviceType } from './utils/GetDeviceType.ts';
import { InfoPanel, InfoPanelList } from './components/InfoPanel/InfoPanel.tsx';

export const server = new Service();

function App() {
    const [product, setProduct] = useState<IProduct | undefined>(undefined);
    const [productUrl, setProductUrl] = useState<string>('');
    const [deviceType, setDeviceType] = useState<DeviceTypes>(DeviceTypes.mobile);

    useEffect(() => {
        setDeviceType(getDeviceType());
    }, []);

    const mobileLayout = <>
        <ProductEntryForm
            setReturnData={setProduct}
            url={productUrl}
            setUrl={setProductUrl}/>
        <Product returnData={product}/>
    </>

    const desktopLayout = <div>Приложение только для мобильной версии браузера.</div>

    return (
        <div className={styles.app}>
            <InfoPanel
                text={'Добавленные в отслеживаемый список товары хранятся на устройстве!'}
                type={InfoPanelList.information}/>
            {deviceType === DeviceTypes.mobile
                ? <>{mobileLayout}</>
                : <>{mobileLayout}</>}
        </div>)
}

export default App
