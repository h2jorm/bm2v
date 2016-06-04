import {Bind} from '../bind';

Bind.register('text', function (view, selector) {
  const doms = view.query(selector);
  const cache = [];
  doms.forEach((dom) => {
    removeChildNodes(dom);
    const textNode = document.createTextNode('');
    dom.appendChild(textNode);
    cache.push(textNode);
  });
  this.update = function (value) {
    cache.forEach(textNode => {
      textNode.textContent = value;
    });
  };
});

function removeChildNodes(dom) {
  const childNodes = dom.childNodes;
  if (!childNodes || !childNodes.length)
    return;
  Array.prototype.forEach.call(childNodes, childNode => childNode.remove());
}
