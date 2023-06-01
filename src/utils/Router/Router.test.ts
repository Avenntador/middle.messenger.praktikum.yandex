// eslint-disable-next-line import/no-extraneous-dependencies, max-classes-per-file
// eslint-disable-next-line import/no-extraneous-dependencies
import sinon from 'sinon';
import { expect } from 'chai';
import Component from '../Component';
import Router from '.';

describe("Router test's", () => {
  const mockedGetContent = sinon.fake.returns(document.createElement('div'));

  const BlockMock = class {
    getContent = mockedGetContent;
  } as unknown as typeof Component;

  it('Should return router instance', () => {
    const result = Router.use('/', BlockMock);

    expect(result).to.eq(Router);
  });

  it('Should render page', () => {
    Router.use('/', BlockMock).start();

    expect(mockedGetContent.callCount).to.eq(1);
  });
});
