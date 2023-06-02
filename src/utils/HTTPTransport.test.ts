// eslint-disable-next-line import/no-extraneous-dependencies
import sinon, { SinonFakeXMLHttpRequest, SinonFakeXMLHttpRequestStatic } from 'sinon';
import { expect } from 'chai';
import Http from './HTTPTransport';

describe('HTTPTransport test', () => {
  let xhr: SinonFakeXMLHttpRequestStatic;
  let instance: Http;
  const requests: SinonFakeXMLHttpRequest[] = [];

  beforeEach(() => {
    xhr = sinon.useFakeXMLHttpRequest();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    global.XMLHttpRequest = xhr;

    xhr.onCreate = (request: SinonFakeXMLHttpRequest) => {
      requests.push(request);
    };

    instance = new Http('/auth');
  });

  afterEach(() => {
    requests.length = 0;
  });

  it('Should http.get() to be "GET"', () => {
    instance.get('/user');

    const [request] = requests;

    expect(request.method).to.eq('GET');
  });

  it('Should http.post() to be "POST"', () => {
    instance.post('/signin');

    const [request] = requests;

    expect(request.method).to.eq('POST');
  });
});
