interface FakeButtonProps {
    setProductUrl: (value: string) => void;
}

const FakeButtons = ({setProductUrl}: FakeButtonProps) => {
    return (
        <div>
            <button
                onClick={() => setProductUrl('https://www.wildberries.by/catalog/257276855/detail.aspx?targetUrl=SN')}>Обыч
            </button>
            <button
                onClick={() => setProductUrl('https://global.wildberries.ru/product/noski-korotkie-nabor-216617294')}>Гл
            </button>
            <button
                onClick={() => setProductUrl('https://global.wildberries.ru/product/noski-korotkie-nabor-216617294?option=345257859')}>ГлОп
            </button>
            <button
                onClick={() => setProductUrl('https://global.wildberries.ru/product?card=110592443')}>Не р
            </button>
        </div>
    );
};

export default FakeButtons;