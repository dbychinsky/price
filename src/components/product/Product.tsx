import styles from './Product.module.css';
import { IProductView } from "../../model/ProductView.ts";

interface ProductProps {
    product: IProductView;
    deleteProduct: (id: number) => void;
    goToWb: (id: number) => void;
}

export const Product = (props: ProductProps) => {
    const {product, deleteProduct, goToWb} = props;

    return (
        <div className={styles.product}>
            <div className={styles.productSectionHead}>
                <div className={styles.productName}>{product.name}</div>
                <div className={styles.productList}>
                    {product.size.map((item) => (
                        <div key={item.name} className={styles.productItem}>
                            {item.name === ''
                                ? null
                                : <div className={styles.productItemName}>
                                    {item.name}
                                </div>
                            }
                            {item.origName === '' || item.origName === '0'
                                ? null
                                : <div className={styles.productItemOrigName}>
                                    {item.origName}
                                </div>}

                            <div className={styles.productPriceTotal}>
                                {item.price.priceTotal ?? 'Нет в наличии'}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.productSectionButtons}>
                <button onClick={() => deleteProduct(product.id)}>d</button>
                <button onClick={() => goToWb(product.id)}>g</button>
            </div>
        </div>
    );
};
