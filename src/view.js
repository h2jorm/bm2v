export class View {
  constructor(conf) {
    const {template, models, events} = conf;
    this.dom = createFragment(template);
    if (models)
      models.forEach(model => {
        this.bindModel(model.model, model.bind);
      });
    if (events)
      for (let selector in events) {
        const event = events[selector];
        const [eventName, callback] = event;
        this.bindEvent(selector, eventName, callback);
      }
  }
  bindModel(model, conf) {
    let key;
    for (key in conf) {
      const binds = conf[key];
      binds.forEach(bind => {
        const [type, selector] = bind;
        if (type === 'text') {
          const container = this.dom.querySelector(selector);
          if (!container)
            throw new Error(`can not find ${selector}`);
          removeChildNodes(container);
          const textNode = document.createTextNode(model.model[key]);
          container.appendChild(textNode);
          model.bindPuppet(key, type, textNode);
        }
        if (type === 'form')
          model.bindPuppet(key, type, this.dom.querySelector(selector));
        model.update(key, model.model[key]);
      });
    }
  }
  bindEvent(selector, eventName, callback) {
    const dom = this.dom.querySelector(selector);
    dom.addEventListener(eventName, callback);
  }
}

function removeChildNodes(dom) {
  const childNodes = dom.childNodes;
  if (!childNodes || !childNodes.length)
    return;
  Array.prototype.forEach.call(childNodes, childNode => childNode.remove());
}

function createFragment(html) {
  var container = document.createElement('div');
  container.innerHTML = html;
  var fragment = document.createDocumentFragment();
  while (container.firstChild) {
    fragment.appendChild(container.firstChild);
  }
  return fragment;
}
