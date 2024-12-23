import { useEffect, useState } from "react";

function App() {
    const urlGoods = `https://www.wildberries.by/catalog/180954182/detail.aspx?targetUrl=SN`;
    const localhost = `http://bouncy-tested-museum.glitch.me/`;
    const wildGoods = urlGoods.slice(35).split('/')[0];
    const urlWildberriesGoods =
        `https://card.wb.ru/cards/v2/detail?curr=byn&dest=-59202&nm=${wildGoods}`
    const [returnData, setReturnData] = useState();
    const [url, setUrl] = useState('');

    return (
        <>
            <input value={url}
                   onChange={
                       (value) =>
                           setUrlValue(value.target.value)}/>
            <button onClick={pushUrl}>get url</button>
            <button onClick={getData}>get data</button>
        </>
    )

    function setUrlValue(value: string) {
        setUrl(value);
    }

    function pushUrl() {
        setUrl(urlGoods);
    }

    async function getData() {
        console.log('start')
        return fetch(localhost)
            .then(response => response.json())
            // .then(response => setReturnData(response.glossary))
            .then(response => console.log(response.glossary))
            .finally(() => console.log('finish'));
    }

}

export default App
