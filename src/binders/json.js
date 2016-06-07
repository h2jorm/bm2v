import {Binder} from '../core/binder';

Binder.register('json', function (view, selector) {
  const doms = view.query(selector);
  const cache = [];
  doms.forEach((dom) => {
    const textNode = document.createTextNode('');
    dom.appendChild(textNode);
    cache.push(textNode);
  });
  this.update = function (value) {
    cache.forEach(textNode => {
      let jsonStr;
      try {
        jsonStr = JSON.stringify(value, null, 2);
      } catch (err) {
        jsonStr = 'invalid json';
      }
      textNode.textContent = jsonStr;
    });
  };
});
