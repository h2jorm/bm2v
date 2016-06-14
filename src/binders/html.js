import {Binder} from '../core/binder';

Binder.register('html', function (view, selector, transform) {
  const doms = view.query(selector);
  // const cache = [];
  const getHTML = typeof transform === 'function' ?
    function (value) { return transform(value); } :
    function (value) { return value; };
  doms.forEach((dom) => {
    removeChildNodes(dom);
  });
  this.update = function (value) {
    doms.forEach(dom => {
      dom.innerHTML = getHTML(value);
    });
  };
});

function removeChildNodes(dom) {
  const childNodes = dom.childNodes;
  if (!childNodes || !childNodes.length)
    return;
  Array.prototype.forEach.call(childNodes, childNode => childNode.remove());
}
