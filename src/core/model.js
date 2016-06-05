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
    return this.model[key];
  }
  update(key, value) {
    this.model[key] = value;
    const binders = this.cache[key];
    if (!binders)
      return;
    binders.cache.forEach(binder => {
      if (typeof binder.update === 'function')
        binder.update(value);
    });
  }
  updateCollection(key, index, value) {
    this.model[key][index] = value;
    const binders = this.cache[key];
    if (!binders)
      return;
    binders.cache.forEach(binder => {
      if (typeof binder.update === 'function')
        binder.update(this.model[key]);
    });
  }
}
