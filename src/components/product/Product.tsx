import styles from './Product.module.css';
import { getProductPriceFraction } from "../../utils/getProductPriceFraction.ts";
import { IProductStorage } from "../../model/ProductStorage.ts";

interface ProductProps {
    product: IProductStorage;
}

export const Product = (props: ProductProps) => {
    const {product} = props;

    return (
        <div className={styles.product}>
            {product.name}
            {getProductPriceFraction(product.price.toString())}
        </div>
    );
};
