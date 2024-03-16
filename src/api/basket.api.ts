import type { AxiosInstance } from 'axios';
import HttpInstanceFactory from './../utils/httpInstanceFactory';
import type { ICartType } from '../interfaces/cart.type';

export class BasketApi {
    private httpInstance: AxiosInstance;

    public constructor() {
        this.httpInstance = HttpInstanceFactory.getBaseInstance();
    }

    async getAllGoods(): Promise<ICartType> {
        return (await this.httpInstance.get<ICartType>('/carts/1')).data;
    }
}
