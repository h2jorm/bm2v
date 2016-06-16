import {Binder} from '../core/binder';

Binder.register('if', function (view, selector, transform) {
  const doms = view.query(selector);
  const cache = [];
  doms.forEach(dom => {
    cache.push([dom, document.createComment(`bm2v if ${selector}`)]);
  });
  this.update = function (value) {
    value = typeof transform === 'function' ? !!transform(value) : !!value;
    cache.forEach(([dom, commentDom]) => {
      if (value)
        replaceTo(dom, commentDom);
      else
        replaceTo(commentDom, dom);
    });
  };
});

function replaceTo(newNode, oldNode) {
  const {parentNode} = oldNode;
  if (!parentNode)
    return;
  parentNode.replaceChild(newNode, oldNode);
}
