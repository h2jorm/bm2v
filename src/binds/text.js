import {Bind} from '../bind';

Bind.register('text', function (view, selector, transform) {
  const doms = view.query(selector);
  const cache = [];
  const getText = typeof transform === 'function' ?
    function (value) { return transform(value); } :
    function (value) { return value; };
  doms.forEach((dom) => {
    removeChildNodes(dom);
    const textNode = document.createTextNode('');
    dom.appendChild(textNode);
    cache.push(textNode);
  });
  this.update = function (value) {
    cache.forEach(textNode => {
      textNode.textContent = getText(value);
    });
  };
});

function removeChildNodes(dom) {
  const childNodes = dom.childNodes;
  if (!childNodes || !childNodes.length)
    return;
  Array.prototype.forEach.call(childNodes, childNode => childNode.remove());
}
