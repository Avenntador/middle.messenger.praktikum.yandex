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
  get<TResponse>(url: string, data: unknown): Promise<TResponse> {
    return this.request(url, { method: METHOD.GET, data });
  }

  post<TResponse>(url: string, data: unknown): Promise<TResponse> {
    return this.request(url, { method: METHOD.POST, data });
  }

  put<TResponse>(url: string, data: unknown): Promise<TResponse> {
    return this.request(url, { method: METHOD.PUT, data });
  }

  delete<TResponse>(url: string, data: unknown): Promise<TResponse> {
    return this.request(url, { method: METHOD.DELETE, data });
  }

  request<TResponse>(url: string, options: Options = { method: METHOD.GET }): Promise<TResponse> {
    return new Promise((resolve, reject) => {
      const { method, data } = options;

      const xhr = new XMLHttpRequest();
      const isGet = method === METHOD.GET;

      if (isGet) {
        url = data ? `${url}${queryStringify(data)}` : url;
      }

      xhr.open(method, url);
      xhr.setRequestHeader('Content-Type', 'text/plain');

      xhr.onload = function () {
        resolve(xhr.response);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === METHOD.GET || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  }
}

export default new Http();
