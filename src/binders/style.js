import {Binder} from '../core/binder';

Binder.register('style', function (view, selector, transform) {
  const doms = view.query(selector);
  this.update = function (value) {
    let styles;
    if (typeof transform === 'function')
      styles = transform(value);
    if (typeof styles !== 'object')
      throw new Error('invalid styles');
    let styleName;
    for (styleName in styles) {
      const value = styles[styleName];
      doms.forEach(dom => {
        dom.style[styleName] = value;
      });
    }
  };
});
