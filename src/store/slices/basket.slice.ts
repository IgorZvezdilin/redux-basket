import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { IProduct } from '../../interfaces/cart.type';
import { getAllGoods } from '../actions/basket.action';

interface IInitialState {
    products: IProduct[] | [];
    total: number;
}

const initialState: IInitialState = {
    products: [],
    total: 0,
};

const basketSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        changeTotal(state, action: PayloadAction<{ type: string; id: string }>) {
            const productIndex = state.products.findIndex(
                (product) => product.id === Number(action.payload.id)
            );

            if (productIndex !== -1) {
                if (action.payload.type === 'remove') {
                    state.products[productIndex].count -= 1;
                    state.total -= state.products[productIndex].price;
                } else {
                    state.products[productIndex].count += 1;
                    state.total += state.products[productIndex].price;
                }
            }
        },
        deleteProduct(state, action: PayloadAction<number>) {
            state.products = state.products.filter((product) => {
                if (product.id === action.payload) {
                    state.total -= product.price * product.count;
                }
                return product.id !== action.payload;
            });
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAllGoods.fulfilled, (state, action: PayloadAction<IProduct[]>) => {
            state.products = action.payload.map((product) => {
                return {
                    ...product,
                    count: 1,
                };
            });
            for (let products of action.payload) {
                state.total += products.price;
            }
        });
        builder.addCase(getAllGoods.pending, (state) => {
            state.products = [];
            state.total = 0;
        });
        builder.addCase(getAllGoods.rejected, (state) => {
            state.products = [];
            state.total = 0;
        });
    },
});

export const { changeTotal, deleteProduct } = basketSlice.actions;

export default basketSlice.reducer;
