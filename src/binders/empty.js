import {Binder} from '../binder';

Binder.register('empty', function () {
  this.update = function () {};
});
