import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosError } from 'axios';
import type { ICartType } from '../../interfaces/cart.type';
import type { ServerError } from '../../interfaces/serverError.type';

import { BasketApi } from '../../api/basket.api';

const basketApi = new BasketApi();

export const getAllGoods = createAsyncThunk('get/goods', async (_, thunkAPI) => {
    try {
        const response: ICartType = await basketApi.getAllGoods();
        return thunkAPI.fulfillWithValue(response.products);
    } catch (err) {
        const { error } = (err as AxiosError).response?.data as ServerError;
        const { message } = error;
        return thunkAPI.rejectWithValue(message);
    }
});
