import Component from './Component';

const renderDom = (query: string, element: Component) => {
  const root = document.querySelector(query);

  if (root) {
    root.innerHTML = '';
    if (element.getContent()) {
      root.append(element.getContent() as Node);
      element.dispatchComponentDidMount();
    }
  } else {
    throw new Error(`root not found by selector "${query}"`);
  }

  return root;
};

export default renderDom;
