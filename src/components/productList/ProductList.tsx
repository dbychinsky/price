import styles from './ProductList.module.css';
import { Product } from "../product/Product.tsx";
import { IProductView } from "../../model/ProductView.ts";

interface ProductListProps {
    productList: IProductView[];
    deleteProduct: (id: number) => void;
    setProductList: (value: IProductView[]) => void;
}

export const ProductList = (props: ProductListProps) => {
    const {
        productList,
        deleteProduct,
    } = props;

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
