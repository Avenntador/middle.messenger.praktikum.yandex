// eslint-disable-next-line import/no-extraneous-dependencies
import { assert } from 'chai';
import Handlebars from 'handlebars';
import Component from './Component';

class FakeComponent extends Component {
  render(): DocumentFragment {
    return this.compile(Handlebars.compile('<div>{{mockedProp}}</div>'), { ...this.props });
  }
}

const mockedComponent = new FakeComponent({ mockedProp: 'initial prop' });

describe('Component test', () => {
  it('Should return right text content', () => {
    assert.equal(mockedComponent.getContent()?.textContent, 'initial prop');
  });

  it('Should change props correctly', () => {
    mockedComponent.setProps({ mockedProp: 'Changed props' });
    assert.equal(mockedComponent.props.mockedProp, 'Changed props');
  });
});
