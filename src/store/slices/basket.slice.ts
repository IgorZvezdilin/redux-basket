import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { IActionProduct, IProduct } from '../../interfaces/cart.type';
import { ActionStatuses } from '../../enum/status.enum';
import { getAllGoods } from '../actions/basket.action';

interface IInitialState {
    products: IProduct[] | [];
    total: number;
    status: ActionStatuses;
}

const initialState: IInitialState = {
    products: [],
    total: 0,
    status: ActionStatuses.PENDING,
};

const basketSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        resetState(state: IInitialState) {
            state.products = [];
            state.status = ActionStatuses.PENDING;
        },
        resetStatus(state: IInitialState) {
            state.status = ActionStatuses.PENDING;
        },
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
            state.status = ActionStatuses.FULL_FIELD;
        });
        builder.addCase(getAllGoods.pending, (state) => {
            state.products = [];
            state.total = 0;
            state.status = ActionStatuses.PENDING;
        });
        builder.addCase(getAllGoods.rejected, (state, action: PayloadAction<any>) => {
            state.products = [];
            state.total = 0;
            state.status = ActionStatuses.REJECTED;
        });
    },
});

export const { resetState, resetStatus, changeTotal, deleteProduct } = basketSlice.actions;

export default basketSlice.reducer;
