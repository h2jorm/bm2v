import {Binder} from '../core/binder';

Binder.register('form', function (view, selector, transform) {
  const inputs = view.query(selector);
  this.update = function (value) {
    const ret = transformVal(value);
    inputs.forEach(input => {
      switch (input.type) {
        case 'text':
        input.value !== ret ? input.value = ret : '';
        break;
        case 'number':
        input.value !== parseInt(ret) ? input.value = parseInt(ret) : '';
        break;
        case 'checkbox':
        input.checked = !!ret;
        break;
        case 'radio':
        input.checked = input.value === ret;
        break;
      }
    });
  };
  function transformVal(value) {
    if (typeof transform === 'function')
      return transform(value)
    return value;
  }
});
