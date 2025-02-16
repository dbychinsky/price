import './Product.scss';
import { IProductView } from "../../model/ProductView.ts";
import { getUrlMarketplace } from "../../utils/GetUrlToMarketplace.ts";
import { Button } from "../button/Button.tsx";
import { IProductLink } from "../../model/ProductLink.ts";
import { useState } from "react";

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
    const [activeIndex, setActiveIndex] = useState<null | number>(null); // Хранит индекс активного элемента
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const productId = product.id;

    return (
        <div className={`product`}>

            <div className='productSectionHead'>
                <div className='productName'>{product.name}</div>
                <span className='subMenu'
                      onClick={toggleMenu}>X</span>
            </div>

            {isOpenMenu &&
                <div className='productSectionButtons'>
                    <Button
                        text={'delete'}
                        onClick={() => deleteProduct(product.id)}
                        className='delete'
                        variant='icon'
                    />
                    <a className='outside'
                       onClick={(event) => handleClick(event, product.id)}
                       title={"wb"}
                       target="_blank"
                       rel="noopener noreferrer">go to marketplace
                    </a>
                </div>
            }

            {activeIndex === productId && product.size.map((item) => (
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

                    <div className='item productPriceList'>
                        {/*<div className='priceTotal'>{item.price.priceTotal ?? 'Нет в наличии'}</div>*/}
                        {/*<div className='priceBasic'>{item.price.priceBasic ?? 'Нет в наличии'}</div>*/}
                        <div className='priceProduct'>{item.price.priceProduct ?? 'Нет в наличии'}</div>
                    </div>
                </div>
            ))}

            <div className='productFooter'
                 onClick={() => openMore(productId)}>
                <div className={`iconMore`}></div>
            </div>

        </div>
    );

    async function handleClick(event: React.MouseEvent<HTMLAnchorElement>, id: number) {
        event.preventDefault();
        const url = await getUrlMarketplace(productUrlList, id); // Ждем результат асинхронной функции
        window.open(url, '_blank');
    }

    function openMore(productId: number) {
        setActiveIndex(activeIndex === productId ? null : productId);
    }

    function toggleMenu() {
        setIsOpenMenu((prev) => !prev);
        if (activeIndex) {
            openMore(productId);
        }
    };

};
