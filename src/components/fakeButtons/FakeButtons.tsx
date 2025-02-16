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

            <button
                onClick={() => setProductUrl('https://global.wildberries.ru/product/gidrofilnoe-maslo-dlya-umyvaniya-110-ml-15357202?option=44705870')}>Не
                1
            </button>
            <button
                onClick={() => setProductUrl('https://global.wildberries.ru/product/diffuzor-dlya-doma-265118573?option=411463908')}>Не
                2
            </button>
            <button
                onClick={() => setProductUrl('https://global.wildberries.ru/product/kapsuly-dlya-stirki-belya-universal-100-sht-235403369?option=370951402')}>Не
                3
            </button>
        </div>
    );
};

export default FakeButtons;