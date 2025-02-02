import './ProductList.scss';
import { Product } from "../product/Product.tsx";
import { IProductView } from "../../model/ProductView.ts";
import { IProductLink } from "../../model/ProductLink.ts";

interface ProductListProps {
    productList: IProductView[];
    productUrlList: IProductLink[];
    deleteProduct: (id: number) => void;
}

export const ProductList = (props: ProductListProps) => {
    const {
        productList,
        productUrlList,
        deleteProduct,
    } = props;

    return (
        <div className='productList'>
            {productList.map((product) => (
                <div key={product.id}>
                    <Product
                        product={product}
                        productUrlList={productUrlList}
                        deleteProduct={deleteProduct}/>
                </div>
            ))}
        </div>
    );
};
