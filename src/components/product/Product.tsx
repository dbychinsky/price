import './Product.scss';
import { IProductView } from "../../model/ProductView.ts";
import { getUrlMarketplace } from "../../utils/GetUrlToMarketplace.ts";
import { Button } from "../button/Button.tsx";
import { IProductLink } from "../../model/ProductLink.ts";

interface ProductProps {
    product: IProductView;
    productUrlList: IProductLink[];
    deleteProduct: (id: number) => void;
}

export const Product = (props: ProductProps) => {
    const {
        product,
        productUrlList,
        deleteProduct
    } = props;

    return (
        <div className='product'>
            <div className='productSectionHead'>
                <div className='productName'>{product.name}</div>
                <div className='productList'>
                    {product.size.map((item) => (
                        <div key={item.name} className='productItem'>
                            <div className='item'>
                                {item.origName === '' || item.origName === '0'
                                    ? null
                                    : <div className='productItemOrigName'>
                                        {item.origName}
                                    </div>}

                                {item.name === ''
                                    ? null
                                    : <div className='productItemName'>
                                        {item.name}
                                    </div>
                                }
                            </div>

                            <div className='item productPrice'>
                                <div className='priceTotal'>{item.price.priceTotal ?? 'Нет в наличии'}</div>
                                <div className='priceBasic'>{item.price.priceBasic ?? 'Нет в наличии'}</div>
                                <div className='priceProduct'>{item.price.priceProduct ?? 'Нет в наличии'}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='productSectionButtons'>
                <Button
                    text={'delete'}
                    onClick={() => deleteProduct(product.id)}
                    className='delete'
                    variant='icon'/>
                <a className='outside'
                   onClick={(event) => handleClick(event, product.id)}
                   title={"wb"}
                   target="_blank"
                   rel="noopener noreferrer">go to marketplace</a>
            </div>
        </div>
    );

    function handleClick(event: React.MouseEvent<HTMLAnchorElement>, id: number) {
        event.preventDefault();
        const url = getUrlMarketplace(productUrlList, id);
        window.open(url, '_blank');
    }

};
