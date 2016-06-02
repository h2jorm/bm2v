export class Puppet {
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
    this.puppets = {};
  }
  bindPuppet(key, bind) {
    const old = this.puppets[key];
    if (!old)
      this.puppets[key] = new Puppet(bind);
    else
      old.add(bind);
  }
  get(key) {
    return this.model[key];
  }
  update(key, value) {
    this.model[key] = value;
    const puppet = this.puppets[key];
    if (!puppet)
      return;
    puppet.cache.forEach(bind => {
      if (typeof bind.update === 'function')
        bind.update(value);
    });
  }
}
