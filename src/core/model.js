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
    this.events = {};
  }
  cacheBinder(key, binder) {
    const old = this.cache[key];
    if (!old)
      this.cache[key] = new BinderCache(binder);
    else
      old.add(binder);
  }
  cancel() {
    // TODO: remove registered events
  }
  get(key) {
    if (!key)
      return this.model;
    return this.model[key];
  }
  on(eventName, cb) {
    if (typeof cb === 'function')
      this.events[eventName] = cb;
  }
  trigger(eventName, ...args) {
    const cb = this.events[eventName];
    if (typeof cb !== 'function')
      return;
    cb.apply(this, args);
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
    this.trigger('$update', key, value);
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
    this.trigger('$updateCollection', key, index, value);
  }
}
