import { useState } from "react";
import { IProduct } from './model/Product.ts';
import { Service } from './service/Service.ts';

export const server = new Service();

function App() {
    // const urlGoods = `https://www.wildberries.by/catalog/250909718/detail.aspx`;

    // const localhost = `http://bouncy-tested-museum.glitch.me/`;
    // const localhost = `http://localhost:3000`;

    // const wildGoods = urlGoods.slice(35).split('/')[0];

    // const urlWildberriesGoods =
    //     `https://card.wb.ru/cards/v2/detail?curr=byn&dest=-59202&nm=${wildGoods}`
    const [returnData, setReturnData] = useState<IProduct | undefined>(undefined);
    const [url, setUrl] = useState('');

    return (
        <>
            <input
                value={url}
                onChange={(value) => setUrlValue(value.target.value)}/>

            <button onClick={pushUrl}>get url</button>
            <button onClick={getData}>get data</button>
            {returnData && returnData.id}
        </>
    )

    function setUrlValue(value: string) {
        setUrl(value);
    }

    function pushUrl() {
        // setUrl(urlGoods);
    }

    async function getData() {
        // console.log('start')
        // return fetch(`${localhost}?id=${wildGoods}`)
        //     .then(response => response.json())
        // .then(response => setReturnData(response))
        // .finally(() => console.log('finish'));

        server.getProduct('250909718').then(response => setReturnData(response));

    }

}

export default App
