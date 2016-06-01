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
    this.puppets = {};
  }
  bindPuppet(key, type, textNode) {
    const old = this.puppets[key];
    if (!old)
      this.puppets[key] = new Puppet(type, textNode);
    else
      old.add(type, textNode);
  }
  update(key, value) {
    this.model[key] = value;
    const puppet = this.puppets[key];
    if (!puppet)
      return;
    puppet.cache.forEach(puppet => {
      const [type, node] = puppet;
      if (type === 'text')
        node.textContent = value;
      if (type === 'form') {
        node.value = value;
      }
    });
  }
}

class View {
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
            title: [
              ['text', '[data-model="title"]'],
              ['form', 'input'],
            ],
            content: [['text', '[data-model="content"]']],
          },
        },
        {
          model: personModel,
          bind: {
            name: [['text', '[data-model="personName"]']],
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
