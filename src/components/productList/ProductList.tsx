import styles from './ProductList.module.css';
import { Product } from "../product/Product.tsx";
import { IProductView } from "../../model/ProductView.ts";

interface ProductListProps {
    productList: IProductView[];
    deleteProduct: (id: number) => void;
    setProductList: (value: IProductView[]) => void;
    goToWb: (id: number) => void;
}

export const ProductList = (props: ProductListProps) => {
    const {
        productList,
        deleteProduct,
        goToWb,
    } = props;

    return (
        <div className={styles.productList}>
            {productList.map((product) => (
                <div key={product.id}>
                    <Product
                        product={product}
                        deleteProduct={deleteProduct}
                        goToWb={goToWb}/>
                </div>
            ))}
        </div>
    );
};
