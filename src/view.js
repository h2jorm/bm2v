import {Bind} from './bind';

export class View {
  constructor(conf) {
    const {template, models, events} = conf;
    this.dom = createContainer(template);
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
  append(selector, view) {
    let parentNode, childNode;
    const errMsg = 'invalid parameters in bm2v.View.append method';
    switch (arguments.length) {
      case 2:
      parentNode = this.queryDom(selector);
      childNode = view instanceof View ? view.dom : view;
      break;
      case 1:
      parentNode = this.dom;
      if (selector instanceof View)
        childNode = selector.dom;
      else if (selector instanceof HTMLElement)
        childNode = selector;
      else
        throw new Error(errMsg);
      break;
      default:
      throw new Error(errMsg);
    }
    if (!parentNode)
      throw new Error(`can not find '${selector}' when try to append to it`);
    parentNode.appendChild(childNode);
  }
  bindEvent(selector, eventName, callback) {
    const dom = this.queryDom(selector);
    if (!dom)
      return;
    dom.addEventListener(eventName, event => {
      callback.call(this, event);
    });
  }
  bindModel(model, conf) {
    let key;
    for (key in conf) {
      const binds = conf[key];
      binds.forEach(bind => {
        // const [type, selector] = bind;
        model.bindPuppet(key, new Bind(bind, this));
        model.update(key, model.model[key]);
      });
    }
  }
  queryDom(selector) {
    if (selector === '')
      return this.dom;
    if (!selector)
      return null;
    return this.dom.querySelector(selector);
  }
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

function createContainer(html) {
  var container = document.createElement('div');
  container.innerHTML = html;
  if (container.childNodes.length === 1 && container.childNodes[0].nodeType === 1)
    return container.childNodes[0];
  return container;
}
