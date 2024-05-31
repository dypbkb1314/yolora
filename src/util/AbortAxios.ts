import { AxiosRequestConfig } from 'axios';

const controller = new Map<String, AbortController>();

const getUrl = (config: AxiosRequestConfig) => {
  return [config.url, config.method].join(':');
};

class AbortAxios {
  addController(config: AxiosRequestConfig) {
    this.removeController(config);
    const url = getUrl(config);
    const abortController = new AbortController();
    config.signal = abortController.signal;
    if (!controller.has(url)) {
      controller.set(url, abortController);
    }
  }
  removeController(config: AxiosRequestConfig) {
    const url = getUrl(config);
    if (controller.has(url)) {
      const abortController = controller.get(url);
      abortController?.abort();
      controller.delete(url);
    }
  }
}

export default AbortAxios;
