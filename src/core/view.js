import {Binder} from './binder';

export class View {
  constructor(conf) {
    const {template, models, events} = conf;
    this.dom = createContainer(template);
    if (models)
      models.forEach(_model => {
        const {model, bind} = _model;
        this.bindModel(model, bind);
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
      parentNode = this.query(selector)[0];
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
    const doms = this.query(selector);
    doms.forEach(dom => {
      dom.addEventListener(eventName, event => {
        callback.call(this, event);
      });
    });
  }
  bindModel(model, bind) {
    let key;
    for (key in bind) {
      const binderCogs = bind[key];
      binderCogs.forEach(bindCog => {
        model.cacheBinder(key, new Binder(bindCog, this));
        model.update(key, key === '' ? model.model : model.model[key]);
      });
    }
  }
  query(selector) {
    if (selector === '')
      return [this.dom];
    if (!selector)
      return [];
    return Array.prototype.slice.call(this.dom.querySelectorAll(selector));
  }
}

function createContainer(html) {
  var container = document.createElement('div');
  container.innerHTML = html;
  if (container.childNodes.length === 1 && container.childNodes[0].nodeType === 1)
    return container.childNodes[0];
  return container;
}
