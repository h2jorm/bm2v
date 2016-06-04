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
  todoExample.setAttribute('data-app', 'todo');
  var todos = new Model({
    todos: [
      {title: 'hello world', done: false,},
      {title: 'hello world again', done: false,},
      {title: 'hello', done: true,},
    ],
  });
  var todoAppView = new View({
    template: '<ul></ul><div><span data-all></span>/<span data-done></span></div>',
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
          ]
        }
      }
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
