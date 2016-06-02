import {Bind} from '../bind';

Bind.register('text', function (view, selector) {
  const container = view.queryDom(selector);
  if (!container)
    throw new Error(`can not find ${selector}`);
  removeChildNodes(container);
  const textNode = document.createTextNode('');
  container.appendChild(textNode);
  this.update = function (value) {
    textNode.textContent = value;
  };
});

function removeChildNodes(dom) {
  const childNodes = dom.childNodes;
  if (!childNodes || !childNodes.length)
    return;
  Array.prototype.forEach.call(childNodes, childNode => childNode.remove());
}
