import {Binder} from '../core/binder';

Binder.register('attr', function (view, selector, transform) {
  const doms = view.query(selector);
  this.update = function (value) {
    let attrs;
    if (typeof transform === 'function')
      attrs = transform(value);
    if (typeof attrs !== 'object')
      throw new Error('invalid styles');
    let attrName;
    for (attrName in attrs) {
      const value = attrs[attrName];
      doms.forEach(dom => {
        dom.setAttribute(attrName, value);
      });
    }
  };
});
