var Model = bm2v.Model;
var View = bm2v.View;

// example: hello
(function () {
  var helloExample = document.getElementById('hello');
  var helloModel = new Model({
    name: '',
  });
  var tmpl = 'name: <input><div>hello, <span data-model="name"></span></div>';
  var view = new View({
    template: tmpl,
    models: [
      {
        model: helloModel,
        bind: {
          name: [
            ['text', '[data-model="name"]'],
          ],
        },
      },
    ],
    events: {
      'input': ['keyup', function (event) {
        var newName = event.currentTarget.value;
        helloModel.update('name', newName);
      }],
    }
  });
  helloExample.appendChild(view.dom);
})();

// example: todo
(function () {
  var todoExample = document.getElementById('todo');
  var todos = new Model({
    todos: [
      {title: 'hello world', done: false,},
      {title: 'hello world again', done: false,},
      {title: 'hello', done: true,},
    ],
  });
  var todoAppView = new View({
    template: '<span data-done></span>/<span data-all></span> done<ul></ul>',
    models: [
      {
        model: todos,
        bind: {
          todos: [
            ['for', 'ul', createTodo],
            ['text', '[data-all]', function (todos) {
              return todos.length;
            }],
            ['text', '[data-done]', function (todos) {
              var count = 0;
              todos.forEach(function (todo) {
                if (todo.done)
                  count++;
              });
              return count;
            }],
          ],
        },
      },
    ],
  });

  var addTodoView = new View({
    template: '<div><input><button>add</button></div>',
    events: {
      'button': ['click', function (event) {
        event.preventDefault();
        var input = this.dom.querySelector('input');
        var newTodoTitle = input.value;
        var newTodo = {
          title: newTodoTitle, done: false
        };
        todos.updateCollection('todos', todos.get('todos').length, newTodo);
        input.value = '';
      }],
    },
  });

  todoExample.appendChild(todoAppView.dom);
  todoExample.appendChild(addTodoView.dom);

  function createTodo(todo, index) {
    var todoModel = new Model(todo);
    var tmpl = '<li><span data-model="title"></span></li>';
    var todoView = new View({
      template: tmpl,
      models: [
        {
          model: todoModel,
          bind: {
            title: [
              ['text', '[data-model="title"]'],
            ],
            done: [
              ['class', '', 'done'],
            ],
          },
        },
      ],
      events: {
        '': ['click', function () {
          var todo = todos.get('todos')[index];
          todo.done = !todoModel.get('done');
          todos.updateCollection('todos', index, todo);
        }],
      },
    });
    return todoView;
  }
})();

// example: json for debug
(function () {
  var json = document.getElementById('json');
  var model = new Model({
    name: 'front-end framework',
    frameworks: [
      'backbone',
      'angular',
      'react',
    ],
  });
  var jsonView = new View({
    template: '<pre></pre>',
    models: [
      {
        model: model,
        bind: {
          '': [
            ['text', '', function (modelVal) {
              return JSON.stringify(modelVal, null, 2);
            }],
          ],
        },
      },
    ],
  });
  var inputView = new View({
    template: '<div><input data-name="name"></div><div><input data-name="frameworks"></div><button>change</button>',
    models: [
      {
        model: model,
        bind: {
          name: [
            ['form', 'input[data-name="name"]'],
          ],
          frameworks: [
            ['form', 'input[data-name="frameworks"]'],
          ],
        },
      }
    ],
    events: {
      'button': ['click', function (event) {
        var content = event.currentTarget.value;
        var name = this.query('input[data-name="name"]')[0].value;
        var frameworks = this.query('input[data-name="frameworks"]')[0].value.split(',');
        model.update('name', name);
        model.update('frameworks', frameworks);
      }],
    },
  });
  json.appendChild(jsonView.dom);
  json.appendChild(inputView.dom);
})();

// example: form
(function () {
  var form = document.getElementById('form');
  var checkboxModel = new Model({
    isGood: true
  });
  var checkboxView = new View({
    template: '<label><input type="checkbox">isGood</label><pre></pre>',
    models: [
      {
        model: checkboxModel,
        bind: {
          isGood: [
            ['form', 'input'],
          ],
          '': [
            ['text', 'pre', function (model) {
              return JSON.stringify(model, null, 2);
            }],
          ],
        },
      }
    ],
    events: {
      'input': ['change', function (event) {
        checkboxModel.update('isGood', event.currentTarget.checked);
      }],
    },
  });
  var radioModel = new Model({
    color: 'red',
  });
  var radioView = new View({
    template: '<label><input type="radio" name="color" value="red">red</label>'
      + '<label><input type="radio" name="color" value="green">green</label>'
      + '<label><input type="radio" name="color" value="yellow">yellow</label>'
      + '<pre></pre>',
    models: [
      {
        model: radioModel,
        bind: {
          color: [
            ['form', 'input[type="radio"]']
          ],
          '': [
            ['text', 'pre', function (model) {
              return JSON.stringify(model, null, 2);
            }],
          ],
        },
      },
    ],
    events: {
      'input': ['change', function (event) {
        radioModel.update('color', event.currentTarget.value);
      }],
    },
  });
  form.appendChild(checkboxView.dom);
  form.appendChild(radioView.dom);
})();
