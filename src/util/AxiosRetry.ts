import type { AxiosError, AxiosInstance } from 'axios';

const wait = (waitTime: number) => {
  return new Promise((reslove: any) => setTimeout(reslove, waitTime));
};

const retry = (instance: AxiosInstance, error: AxiosError) => {
  const config: any = error.config;
  const { waitTime, count } = config.retryConfig ?? {};
  config.currentCount = config.currentCount ?? 0;
  console.log('第' + config.currentCount + '次重连');
  if (config.currentCount >= count) {
    return Promise.reject(error);
  }
  config.currentCount++;
  wait(waitTime).then(() => instance(config));
};

export default retry;
