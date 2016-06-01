export class Puppet {
  constructor(type, node) {
    this.cache = [];
    if (type && node)
      this.add(type, node);
  }
  add(type, node) {
    this.cache.push([type, node]);
  }
}

export class Model {
  constructor(value) {
    this.model = value;
    this.puppets = {};
  }
  bindPuppet(key, type, textNode) {
    const old = this.puppets[key];
    if (!old)
      this.puppets[key] = new Puppet(type, textNode);
    else
      old.add(type, textNode);
  }
  update(key, value) {
    this.model[key] = value;
    const puppet = this.puppets[key];
    if (!puppet)
      return;
    puppet.cache.forEach(puppet => {
      const [type, node] = puppet;
      if (type === 'text')
        node.textContent = value;
      if (type === 'form') {
        node.value = value;
      }
    });
  }
}
