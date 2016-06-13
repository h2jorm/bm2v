import {Binder} from '../core/binder';

Binder.register('class', function (view, selector, classNames, transform) {
  classNames = toClassNameList(classNames);
  const doms = view.query(selector);
  this.update = function (value) {
    const toAdd = typeof transform === 'function' ? !!transform(value) : !!value;
    doms.forEach(dom => {
      const classList = dom.classList;
      const exec = toAdd ? classList.add : classList.remove;
      exec.apply(classList, classNames);
    });
  };
});

function toClassNameList(classNames) {
  if (!classNames)
    return [];
  if (Array.isArray(classNames))
    return classNames;
  return [classNames];
}
