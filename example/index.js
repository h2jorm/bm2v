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
            ['form', 'input'],
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
  var todos = [
    {title: 'hello world', done: false,},
    {title: 'hello world again', done: false,},
    {title: 'hello', done: true,},
  ];
  var todoAppView = new View({
    template: '<ul></ul>'
  });
  todos.forEach(function (_todo) {
    var todo = createTodo(_todo);
    todoAppView.append('ul', todo);
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
        todoAppView.append('ul', createTodo(newTodo));
        input.value = '';
      }],
    },
  });

  todoExample.appendChild(todoAppView.dom);
  todoExample.appendChild(addTodoView.dom);

  function createTodo(todo) {
    var todoModel = new Model(todo);
    var tmpl = '<li><span data-model="title"></span>-<span data-model="done"></span></li>';
    var todoView = new View({
      template: tmpl,
      models: [
        {
          model: todoModel,
          bind: {
            title: [
              ['text', '[data-model="title"]'],
            ],
            done: [['text', '[data-model="done"]']],
          },
        },
      ],
    });
    return todoView;
  }
})();
