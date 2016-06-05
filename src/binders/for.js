import {Binder} from '../core/binder';

Binder.register('for', function (view, selector, createChildView) {
  const doms = view.query(selector);
  this.update = function (collection) {
    let childViews = [];
    collection.forEach((model, index) => {
      const childView = createChildView(model, index);
      childViews.push(childView);
    });
    doms.forEach(dom => {
      while(dom.firstChild) {
        dom.firstChild.remove();
      }
      childViews.forEach(childView => {
        dom.appendChild(childView.dom);
      });
    });
  };
});
