import type { store } from './store';

declare global {
    namespace RTK {
        type AppDispatch = typeof store.dispatch;

        type RootState = ReturnType<typeof store.getState>;
    }
}
