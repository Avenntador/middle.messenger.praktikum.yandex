import Component from './Component';

const renderDom = (container: HTMLElement, element: Component) => {
  container.innerHTML = '';
  if (element.getContent()) {
    container.append(element.getContent() as Node);
  }
};

export default renderDom;
