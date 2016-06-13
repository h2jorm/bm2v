export class Binder {
  static register(type, fn) {
    if (Binder.strategies[type])
      throw new Error(`${type} has been registered in Binder strategies`);
    Binder.strategies[type] = fn;
  }
  static cancel(type) {
    delete Binder.strategies[type];
  }
  constructor(cog, viewCtx) {
    if  (cog.length === 1 && typeof cog[0] === 'function') {
      this.update = cog[0].bind(viewCtx);
      return;
    }
    const [type, ...strategyParams] = cog;
    const strategy = Binder.strategies[type];
    if (!strategy)
      throw new Error(`${type} is not registered in Binder strategies`);
    if (typeof strategy === 'function') {
      strategyParams.unshift(viewCtx);
      // `this` points to a view
      strategy.apply(this, strategyParams);
    }
  }
}

Binder.strategies = {};
