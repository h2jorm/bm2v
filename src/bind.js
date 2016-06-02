export class Bind {
  static register(type, fn) {
    if (Bind.strategies[type])
      throw new Error(`${type} has been registered in Bind strategies`);
    Bind.strategies[type] = fn;
  }
  static cancel(type) {
    delete Bind.strategies[type];
  }
  constructor(conf, viewCtx) {
    const [type, ...strategyParams] = conf;
    const strategy = Bind.strategies[type];
    if (!strategy)
      throw new Error(`${type} is not registered in Bind strategies`);
    if (typeof strategy === 'function') {
      strategyParams.unshift(viewCtx);
      strategy.apply(this, strategyParams);
    }
  }
}

Bind.strategies = {};
