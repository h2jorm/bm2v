import {Binder} from '../core/binder';

Binder.register('form', function (view, selector) {
  const inputs = view.query(selector);
  this.update = function (value) {
    inputs.forEach(input => {
      input.value !== value ? input.value = value : '';
    });
  };
});
