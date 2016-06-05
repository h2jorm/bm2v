import {Binder} from '../binder';

Binder.register('class', function (view, selector, classNames) {
  classNames = toClassNameList(classNames);
  const doms = view.query(selector);
  this.update = function (value) {
    doms.forEach(dom => {
      const classList = dom.classList;
      const exec = !!value ? classList.add : classList.remove;
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
