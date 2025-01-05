import styles from './ProductList.module.css';
import { Product } from "../product/Product.tsx";
import { IProductStorage } from "../../model/ProductStorage.ts";

interface ProductListProps {
    productList: IProductStorage[];
    deleteProduct: (id: number) => void;
}

export const ProductList = (props: ProductListProps) => {
    const {productList, deleteProduct} = props;

    return (
        <div className={styles.productList}>
            {productList.map((product) => (
                <div key={product.id}>
                    <Product
                        product={product}
                        deleteProduct={deleteProduct}/>
                </div>
            ))}
        </div>
    );
};
