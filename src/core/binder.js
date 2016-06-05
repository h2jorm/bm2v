export class Binder {
  static register(type, fn) {
    if (Binder.strategies[type])
      throw new Error(`${type} has been registered in Binder strategies`);
    Binder.strategies[type] = fn;
  }
  static cancel(type) {
    delete Binder.strategies[type];
  }
  constructor(conf, viewCtx) {
    const [type, ...strategyParams] = conf;
    const strategy = Binder.strategies[type];
    if (!strategy)
      throw new Error(`${type} is not registered in Binder strategies`);
    if (typeof strategy === 'function') {
      strategyParams.unshift(viewCtx);
      strategy.apply(this, strategyParams);
    }
  }
}

Binder.strategies = {};
