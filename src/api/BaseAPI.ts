import Http from '../utils/HTTPTransport';

interface SearchFields {
  id?: number | string;
  offset?: number;
  limit?: number;
  name?: string;
  title?: string;
}

abstract class BaseAPI {
  protected http: Http;

  constructor(endpoint: string) {
    this.http = new Http(endpoint);
  }

  abstract create?(data: unknown): Promise<unknown>;

  abstract request?(id?: string | SearchFields): Promise<unknown>;

  abstract update?(id: string, data: unknown): Promise<unknown>;

  abstract delete?(id?: string): Promise<unknown>;
}

export default BaseAPI;
