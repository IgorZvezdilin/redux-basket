import './App.css';
import { useEffect } from 'react';
import { useActions, useAppSelector } from './store/store';
import { Grid } from '@mui/material';
import ProductList from './components/ProductList';
import TotalSum from './components/totalSum';

const App = () => {
    const { products, total } = useAppSelector((state) => state.products);
    const { getAllGoods } = useActions();

    useEffect(() => {
        getAllGoods();
    }, [getAllGoods]);

    return (
        <div className='App'>
            <Grid container spacing={2}>
                <Grid
                    item
                    xs={9}
                    display={'flex'}
                    justifyContent={'center'}
                    bgcolor={'#087E8B'}
                    minHeight={'100vh'}
                >
                    <ProductList products={products} />
                </Grid>
                <Grid
                    item
                    xs={3}
                    bgcolor={'#0B3954'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    minHeight={'100vw'}
                >
                    <TotalSum totalSum={total} />
                </Grid>
            </Grid>
        </div>
    );
};

export default App;
