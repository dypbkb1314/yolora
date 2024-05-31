import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from 'axios';
import { AxiosOptions, RequstInterceptors } from './type';
import AbortAxios from './AbortAxios';

export class AxiosMax {
  // axios实例
  private axiosInstance: AxiosInstance;
  // 传入的参数
  private options: AxiosOptions;
  // 拦截器
  private interceptors: RequstInterceptors | undefined;

  constructor(options: AxiosOptions) {
    this.axiosInstance = axios.create(options);
    this.options = options;
    this.interceptors = options.interceptors;
    this.setInterceptors();
  }

  setInterceptors() {
    if (!this.interceptors) return;
    const {
      requestInterceptorsCatch,
      requestInterceptors,
      responseInterceptor,
      responseInterceptorsCatch,
    } = this.interceptors;

    const abortAxios = new AbortAxios();

    this.axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const abortRepetiveRequest =
          (config as unknown as any)?.abortRepetiveRequest ??
          this.options.abortRepetitiveRequest;
        if (abortRepetiveRequest) {
          abortAxios.addController(config);
        }
        if (requestInterceptors) {
          config = requestInterceptors(config);
        }
        return config;
      },
      requestInterceptorsCatch ?? undefined,
    );

    this.axiosInstance.interceptors.response.use(
      (res: AxiosResponse) => {
        res && abortAxios.removeController(res.config);
        if (responseInterceptor) {
          res = responseInterceptor(res);
        }
        if (this.options.directlyGetData) {
          res = res.data;
        }
        return res;
      },
      (err: AxiosError) => {
        if (responseInterceptorsCatch) {
          return responseInterceptorsCatch(this.axiosInstance, err);
        }
        return err;
      },
    );
  }

  request<T = any>(config: AxiosRequestConfig): Promise<T> {
    return new Promise((reslove, reject) => {
      this.axiosInstance
        .request(config)
        .then((res) => {
          return reslove(res as unknown as Promise<T>);
        })
        .catch((err) => {
          return reject(err);
        });
    });
  }

  get<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' });
  }
  post<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' });
  }
  patch<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' });
  }
  delete<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' });
  }
  put<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'PUT' });
  }
}
