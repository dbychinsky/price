import styles from './ProductList.module.css';
import { Product } from "../product/Product.tsx";
import { IProductStorage } from "../../model/ProductStorage.ts";

interface ProductListProps {
    productList: IProductStorage[];
}

export const ProductList = (props: ProductListProps) => {
    const {productList} = props;

    return (
        <div className={styles.productList}>
            {productList.map((product) => (
                <div key={product.id}>
                    <Product product={product}/>
                </div>
            ))}
        </div>
    );
};
