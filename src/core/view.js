import {Binder} from './binder';

export class View {
  constructor(conf) {
    const {template, models, events, model, bind} = conf;
    this.dom = createContainer(template);
    // this is a sugar api
    if (model && bind)
      this.bindModel(model, bind);
    if (!model && models)
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
    let ret = [];
    if (!selector) {
      ret.push(this.dom);
      return ret;
    }
    if (matchesSelector(this.dom, selector))
      ret.push(this.dom);
    Array.prototype.forEach.call(this.dom.querySelectorAll(selector), dom => {
      ret.push(dom);
    });
    return ret;
  }
}

function createContainer(html) {
  var container = document.createElement('div');
  container.innerHTML = html;
  if (container.childNodes.length === 1 && container.childNodes[0].nodeType === 1)
    return container.childNodes[0];
  return container;
}

function matchesSelector(dom, selector) {
  if (!selector || !dom)
    return false;
  const matches = dom.matches || dom.msMatchesSelector || dom.mozMatchesSelector || dom.webkitMatchesSelector;
  if (!matches)
    return false;
  return matches.call(dom, selector);
}
