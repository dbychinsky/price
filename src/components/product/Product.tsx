import styles from './Product.module.css';
import { IProductView } from "../../model/ProductView.ts";

interface ProductProps {
    product: IProductView;
    deleteProduct: (id: number) => void;
}

export const Product = (props: ProductProps) => {
    const {product, deleteProduct} = props;

    return (
        <div className={styles.product}>
            <div>{product.name}</div>
            <div>{product.size.map((item) => (
                <div key={item.name}>
                    {item.name}<br/>
                    {item.origName}<br/>
                    {item.price.priceTotal ?? 'Нет в наличии'}<br/>
                    {item.price.priceBasic ?? item.price.priceBasic}<br/>
                </div>
            ))}</div>
            <button onClick={() => deleteProduct(product.id)}>delete</button>
        </div>
    );
};
