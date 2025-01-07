interface FakeButtonProps {
    setProductUrl: (value: string) => void;
}

const FakeButtons = ({setProductUrl}: FakeButtonProps) => {
    return (
        <div>
            <button
                onClick={() => setProductUrl('https://www.wildberries.by/catalog/257276855/detail.aspx?targetUrl=SN')}>0
            </button>
            <button
                onClick={() => setProductUrl('https://www.wildberries.by/catalog/257276855/detail.aspx?targetUrl=SN')}>0
            </button>
            <button
                onClick={() => setProductUrl('https://www.wildberries.by/catalog/143878721/detail.aspx?targetUrl=SN')}>1
            </button>
            <button onClick={() => setProductUrl('https://www.wildberries.by/catalog/224283509/detail.aspx')}>1</button>
            <button onClick={() => setProductUrl('https://www.wildberries.by/catalog/113178628/detail.aspx')}>2</button>
            <button onClick={() => setProductUrl('https://www.wildberries.by/catalog/144299547/detail.aspx')}>3</button>

        </div>
    );
};

export default FakeButtons;