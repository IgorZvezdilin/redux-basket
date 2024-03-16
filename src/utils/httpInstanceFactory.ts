import type { AxiosInstance } from 'axios';
import axios from 'axios';

export default class HttpInstanceFactory {
    private static baseInstance: AxiosInstance | null = null;

    public static getBaseInstance(): AxiosInstance {
        if (this.baseInstance) return this.baseInstance;
        this.baseInstance = axios.create({
            baseURL: import.meta.env.VITE_API_URL,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return this.baseInstance;
    }
}
