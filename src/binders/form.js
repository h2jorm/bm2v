import {Binder} from '../core/binder';

Binder.register('form', function (view, selector) {
  const inputs = view.query(selector);
  this.update = function (value) {
    inputs.forEach(input => {
      switch (input.type) {
        case 'text':
        input.value !== value ? input.value = value : '';
        break;
        case 'checkbox':
        input.checked = !!value;
        break;
        case 'radio':
        input.checked = input.value === value;
        break;
      }
    });
  };
});
