export class BinderCache {
  constructor(bind) {
    this.cache = [];
    if (bind)
      this.add(bind);
  }
  add(bind) {
    this.cache.push(bind);
  }
}

export class Model {
  constructor(value) {
    this.model = value;
    this.cache = {};
  }
  cacheBinder(key, binder) {
    const old = this.cache[key];
    if (!old)
      this.cache[key] = new BinderCache(binder);
    else
      old.add(binder);
  }
  get(key) {
    if (!key)
      return this.model;
    return this.model[key];
  }
  update(key, value) {
    if (key === '')
      this.model = value;
    else
      this.model[key] = value;
    const bindersOfKey = this.cache[key];
    const bindersOfModel = key === '' ? null : this.cache[''];
    if (bindersOfKey)
      bindersOfKey.cache.forEach(binder => {
        if (typeof binder.update === 'function')
          binder.update(value);
      });
    if (bindersOfModel)
      bindersOfModel.cache.forEach(binder => {
        if (typeof binder.update === 'function')
          binder.update(this.model);
      });
  }
  updateCollection(key, index, value) {
    if (key === '')
      this.model[index] = value;
    else
      this.model[key][index] = value;
    const bindersOfKey = this.cache[key];
    const bindersOfModel = key === '' ? null : this.cache[''];
    if (bindersOfKey)
      bindersOfKey.cache.forEach(binder => {
        if (typeof binder.update === 'function')
          binder.update(this.model[key]);
      });
    if (bindersOfModel)
      bindersOfModel.cache.forEach(binder => {
        if (typeof binder.update === 'function')
          binder.update(this.model);
      });
  }
}
