class Puppet {
  constructor(type, node) {
    this.cache = [];
    this.add(type, node);
  }
  add(type, node) {
    this.cache.push([type, node]);
  }
}

class Model {
  constructor(value) {
    this.model = value;
    this.binds = {};
  }
  bind(key, type, textNode) {
    const old = this.binds[key];
    if (!old) {
      this.binds[key] = new Puppet(type, textNode);
    }
    else
      this.binds[key] = old.add(type, textNode);
  }
  update(key, value) {
    this.model[key] = value;
    const puppet = this.binds[key];
    if (!puppet)
      return;
    puppet.cache.forEach(puppet => {
      const [type, node] = puppet;
      if (type === 'text')
        node.textContent = value;
      if (type === 'form')
        node.value = value;
    });
  }
}

class View {
  constructor(conf) {
    const {template, models, events} = conf;
    this.dom = createFragment(template);
    if (models)
      models.forEach(model => {
        this.bind(model.model, model.bind);
      });
    if (events)
      for (let selector in events) {
        const event = events[selector];
        const [eventName, callback] = event;
        this.bindEvent(selector, eventName, callback);
      }
  }
  bind(model, conf) {
    let key;
    for (key in conf) {
      const [type, selector] = conf[key];
      const container = this.dom.querySelector(selector);
      if (!container)
        throw new Error(`can not find ${selector}`);
      removeChildNodes(container);
      const textNode = document.createTextNode(model.model[key]);
      container.appendChild(textNode);
      model.bind(key, type, textNode);
      model.update(key, model.model[key]);
    }
  }
  bindEvent(selector, eventName, callback) {
    const dom = this.dom.querySelector(selector);
    dom.addEventListener(eventName, callback);
  }
}

(function () {
  var container = document.getElementById('app');
  const todos = [
    {title: 'hello world', content: 'hello world...',},
    {title: 'hello world again', content: 'hello world again...',},
    {title: 'hello', content: 'hello...',},
  ];
  const person = {
    name: 'leeching'
  };

  const personModel = new Model(person);

  todos.forEach(todo => {
    const todoModel = new Model(todo);
    const todoView = new View({
      template: require('./todo.html'),
      models: [
        {
          model: todoModel,
          bind: {
            title: ['text', '[data-model="title"]'],
            content: ['text', '[data-model="content"]'],
            // title: ['form', 'input'],
          },
        },
        {
          model: personModel,
          bind: {
            name: ['text', '[data-model="personName"]'],
          },
        },
      ],
      events: {
        'input': ['blur', changeTodoTitle(todoModel)],
      },
    });
    container.appendChild(todoView.dom);
  });
  function changeTodoTitle(todoModel) {
    return function (event) {
      const newTitle = event.currentTarget.value;
      if (!newTitle)
        return;
      todoModel.update('title', newTitle);
    };
  }
})();

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
