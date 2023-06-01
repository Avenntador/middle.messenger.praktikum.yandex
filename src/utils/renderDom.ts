import Component from './Component';

const renderDom = (query: string, element: Component) => {
  const root = document.querySelector(query);

  if (root) {
    root.innerHTML = '';
    root.append(element.getContent() as Node);
  } else {
    throw new Error(`root not found by selector "${query}"`);
  }

  return root;
};

export default renderDom;
