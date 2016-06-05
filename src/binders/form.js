import {Binder} from '../core/binder';

Binder.register('form', function (view, selector) {
  const input = view.querySelector(selector);
  this.update = function (value) {
    input.value !== value ? input.value = value : '';
  };
});
