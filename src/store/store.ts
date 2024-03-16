import { bindActionCreators, combineReducers, configureStore } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import type { TypedUseSelectorHook } from 'react-redux';
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useDispatch, useSelector } from 'react-redux';
import * as basketActions from './actions/basket.action';
import basketReducer from './slices/basket.slice';

export const combineActions = {
    ...basketActions,
};

export const store = configureStore({
    reducer: combineReducers({
        products: basketReducer,
    }),
});

export const useAppSelector: TypedUseSelectorHook<RTK.RootState> = useSelector;

export function useAppDispatch() {
    return useDispatch<RTK.AppDispatch>();
}

export const useActions = () => {
    const dispatch = useDispatch();
    return useMemo(() => bindActionCreators(combineActions, dispatch), [dispatch]);
};
