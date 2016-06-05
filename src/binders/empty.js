import {Binder} from '../core/binder';

Binder.register('empty', function () {
  this.update = function () {};
});
