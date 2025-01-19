import './Product.scss';
import { IProductView } from "../../model/ProductView.ts";
import { getUrlMarketplace } from "../../utils/GetUrlToMarketplace.ts";
import { Button } from "../button/Button.tsx";

interface ProductProps {
    product: IProductView;
    deleteProduct: (id: number) => void;
}

export const Product = (props: ProductProps) => {
    const {product, deleteProduct} = props;

    return (
        <div className='product'>
            <div className='productSectionHead'>
                <div className='productName'>{product.name}</div>
                <div className='productList'>
                    {product.size.map((item) => (
                        <div key={item.name} className='productItem'>
                            {item.name === ''
                                ? null
                                : <div className='productItemName'>
                                    {item.name}
                                </div>
                            }
                            {item.origName === '' || item.origName === '0'
                                ? null
                                : <div className='productItemOrigName'>
                                    {item.origName}
                                </div>}

                            <div className='productPriceTotal'>
                                {item.price.priceTotal ?? 'Нет в наличии'}
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
                <a className='outside' href={getUrlMarketplace(product.id)}
                   title={"wb"}
                   target="_blank"
                   rel="noopener noreferrer">go to marketplace</a>
            </div>
        </div>
    );
};
