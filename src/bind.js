let strategies = {};

export class Bind {
  static register(type, fn) {
    if (strategies[type])
      throw new Error(`${type} has been registered in Bind strategies`);
    strategies[type] = fn;
  }
  constructor(conf, ctx) {
    const [type, ...strategyParams] = conf;
    const strategy = strategies[type];
    if (!strategy)
      throw new Error(`${type} is not registered in Bind strategies`);
    if (typeof strategy === 'function') {
      strategyParams.unshift(ctx);
      strategy.apply(this, strategyParams);
    }
  }
}

Bind.register('text', function (view, selector) {
  const container = view.queryDom(selector);
  if (!container)
    throw new Error(`can not find ${selector}`);
  removeChildNodes(container);
  const textNode = document.createTextNode('');
  container.appendChild(textNode);
  this.update = function (value) {
    textNode.textContent = value;
  };
});

function removeChildNodes(dom) {
  const childNodes = dom.childNodes;
  if (!childNodes || !childNodes.length)
    return;
  Array.prototype.forEach.call(childNodes, childNode => childNode.remove());
}
