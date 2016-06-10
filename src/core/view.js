import {Binder} from './binder';

export class View {
  constructor(conf) {
    const {
      template, models, model, bind,
      events: domEvents,
      on: viewEvents,
    } = this._unpackConf(conf);
    // cache parent view and child views
    this.parent = null;
    this.children = [];
    // `this.events` points to view events, not dom events
    this.events = [];
    this.dom = createContainer(template);
    // this is a sugar api
    if (model && bind)
      this.bindModel(model, bind);
    if (!model && models)
      models.forEach(_model => {
        const {model, bind} = _model;
        this.bindModel(model, bind);
      });
    if (domEvents)
      for (let selector in domEvents) {
        const event = domEvents[selector];
        const [eventName, callback] = event;
        this.bindEvent(selector, eventName, callback);
      }
    if (viewEvents)
      for (let eventName in viewEvents) {
        const cb = viewEvents[eventName];
        if (typeof cb === 'function')
          this.events[eventName] = cb.bind(this);
      }
  }
  /**
   * @private
   * @return {Object} {template, models, model, bind, events, on}
   */
  _unpackConf(conf) {
    const buildIn = [
      'template', 'models', 'model', 'bind', 'events', 'on',
    ];
    const ret = {};
    buildIn.forEach(attrName => {
      ret[attrName] = conf[attrName];
      delete conf[attrName];
    });
    for (let methodName in conf) {
      if (!conf.hasOwnProperty(methodName))
        continue;
      let method = conf[methodName];
      this[methodName] = conf[methodName];
    }
    return ret;
  }
  append(selector, view) {
    let parentNode, childNode;
    const errMsg = 'invalid parameters in bm2v.View.append method';
    switch (arguments.length) {
      case 2:
      parentNode = this.query(selector)[0];
      childNode = view instanceof View ? view.dom : view;
      if (view instanceof View) {
        childNode = view.dom;
        recordCtxViews.call(this, view);
      } else
        childNode = view;
      break;
      case 1:
      parentNode = this.dom;
      if (selector instanceof View) {
        childNode = selector.dom;
        recordCtxViews.call(this, selector);
      } else if (selector instanceof HTMLElement)
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
    function recordCtxViews(childView) {
      childView.parent = this;
      this.children.push(childView);
    }
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
  broadcast(eventName) {
    const args = Array.prototype.slice.call(arguments, 1);
    broadcast(this.children);

    function broadcast(childViews) {
      childViews.forEach(childView => {
        const cb = childView.events[eventName];
        cb(args);
        if (childView.children.length)
          broadcast(childView.children);
      });
    }
  }
  emit(eventName) {
    const args = Array.prototype.slice.call(arguments, 1);
    let parentView = this;
    while (parentView = parentView.parent) {
      const cb = parentView.events[eventName];
      cb(args);
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
  const matches = dom.matches ||
    dom.msMatchesSelector ||
    dom.mozMatchesSelector ||
    dom.webkitMatchesSelector;
  if (!matches)
    return false;
  return matches.call(dom, selector);
}
