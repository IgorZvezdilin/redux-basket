import type * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import type { IProduct } from '../interfaces/cart.type';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useCallback } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { useAppDispatch } from '../store/store';
import { changeTotal, deleteProduct } from '../store/slices/basket.slice';

interface IProductItem {
    product: IProduct;
}

export default function ProductItem({ product }: IProductItem) {
    const dispatch = useAppDispatch();

    //const [productCount, setProductCount] = useState<number>(1);

    const handleChangeProductCount = useCallback(
        (event: React.MouseEvent<HTMLButtonElement>) => {
            const [type, id] = event.currentTarget.value.split('_');
            dispatch(changeTotal({ type, id }));
        },
        [dispatch]
    );

    const handleDeleteProduct = useCallback(
        (event: React.MouseEvent<HTMLButtonElement>) => {
            dispatch(deleteProduct(Number(event.currentTarget.value)));
        },
        [dispatch]
    );

    return (
        <Card sx={{ minWidth: 350, maxWidth: 350, backgroundColor: '#BFD7EA' }}>
            <CardContent>
                <img
                    src={product.thumbnail}
                    alt={`product ${product.id}`}
                    className={'product-image'}
                />
                <Typography sx={{ fontSize: 18 }} gutterBottom>
                    {product.title}
                </Typography>
                <Typography sx={{ fontSize: 16 }}>Количество: {product.quantity} шт.</Typography>
                <Typography sx={{ fontSize: 16 }}>Цена: {product.price} руб</Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton
                    size='small'
                    onClick={handleChangeProductCount}
                    value={`remove_${product.id}`}
                    disabled={product.count === 1}
                >
                    <RemoveIcon />
                </IconButton>
                <Typography>{product.count}</Typography>
                <IconButton
                    size='small'
                    onClick={handleChangeProductCount}
                    value={`add_${product.id}`}
                    disabled={product.count === product.quantity || product.count === 10}
                >
                    <AddIcon />
                </IconButton>
                <IconButton
                    size='small'
                    onClick={handleDeleteProduct}
                    color={'error'}
                    value={product.id}
                >
                    <DeleteIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
}
