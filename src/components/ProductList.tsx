import { Skeleton, Stack } from '@mui/material';
import type { IProduct } from '../interfaces/cart.type';
import ProductItem from './productItem';

interface IProductList {
    products: IProduct[];
}

export default function ProductList({ products }: IProductList) {
    return (
        <Stack gap={'20px'} marginY={'20px'}>
            {products.length > 0 ? (
                products.map((product, index) => {
                    return <ProductItem product={product} key={index} />;
                })
            ) : (
                <>
                    <Skeleton variant={'rounded'} width={350} height={500} />
                    <Skeleton variant={'rounded'} width={350} height={500} />
                    <Skeleton variant={'rounded'} width={350} height={500} />
                    <Skeleton variant={'rounded'} width={350} height={500} />
                </>
            )}
        </Stack>
    );
}
