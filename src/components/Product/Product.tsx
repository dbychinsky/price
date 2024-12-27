import styles from './Product.module.css';
import { IProduct } from '../../model/Product.ts';

interface ProductProps {
    returnData: IProduct | undefined;
}

export const Product = (props: ProductProps) => {
    const {returnData} = props;

    return (
        <div className={styles.product}>
            {returnData && returnData.name}
        </div>
    );
};
