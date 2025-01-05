import styles from './Product.module.css';
import { getProductPriceFraction } from "../../utils/getProductPriceFraction.ts";
import { IProductStorage } from "../../model/ProductStorage.ts";

interface ProductProps {
    product: IProductStorage;
    deleteProduct: (id: number) => void;
}

export const Product = (props: ProductProps) => {
    const {product, deleteProduct} = props;

    return (
        <div className={styles.product}>
            {product.name}
            {getProductPriceFraction(product.price.toString())}
            <button onClick={() => deleteProduct(product.id)}>delete</button>
        </div>
    );
};
