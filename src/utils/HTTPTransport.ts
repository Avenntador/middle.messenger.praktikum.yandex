enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

type Options = {
  method: METHOD;
  data?: any;
};

type QueryStringifyType = string | Record<string, string>;
type HTTPMethod = <T, K>(path: string, data?: K) => Promise<T>;

function queryStringify(data: QueryStringifyType): string {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }

  const keys = Object.keys(data);
  return keys.reduce(
    (result, key, index) => `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`,
    '?',
  );
}

class Http {
  static BASE_URL = 'https://ya-praktikum.tech/api/v2';

  protected url = '';

  constructor(endpoint: string) {
    this.url = `${Http.BASE_URL}${endpoint}`;
  }

  get: HTTPMethod = (path, data) => this.request(`${this.url}${path}`, { method: METHOD.GET, data });

  post: HTTPMethod = (path, data) => {
    return this.request(`${this.url}${path}`, { method: METHOD.POST, data });
  };

  put: HTTPMethod = (path, data) => {
    return this.request(`${this.url}${path}`, { method: METHOD.PUT, data });
  };

  delete: HTTPMethod = (path, data) => {
    return this.request(`${this.url}${path}`, { method: METHOD.DELETE, data });
  };

  request<TResponse>(url: string, options: Options = { method: METHOD.GET }): Promise<TResponse> {
    return new Promise((resolve, reject) => {
      const { method, data } = options;

      const xhr = new XMLHttpRequest();
      const isGet = method === METHOD.GET;

      if (isGet) {
        url = data ? `${url}${queryStringify(data)}` : url;
      }

      xhr.open(method, url);
      xhr.withCredentials = true;

      if (!(data instanceof FormData)) {
        xhr.setRequestHeader('Content-Type', 'application/json');
      }

      xhr.onload = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status < 400) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      };

      xhr.onabort = () => reject(xhr);
      xhr.onerror = () => reject(xhr);
      xhr.ontimeout = () => reject(xhr);

      if (method === METHOD.GET || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  }
}

export default Http;
