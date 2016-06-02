import {Bind} from '../bind';

Bind.register('json', function (view, selector) {
  const container = view.querySelector(selector);
  if (!container)
    throw new Error(`can not find ${selector}`);
  removeChildNodes(container);
  const textNode = document.createTextNode('');
  container.appendChild(textNode);
  this.update = function (value) {
    try {
      textNode.textContent = JSON.stringify(value, null, 2);
    } catch (err) {
      textNode.textContent = 'invalid json';
    }
  };
});
