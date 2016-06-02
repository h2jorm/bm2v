import {Bind} from '../bind';

Bind.register('empty', function () {
  this.update = function () {};
});
