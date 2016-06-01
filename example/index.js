import {Model} from '../src/model';
import {View} from '../src/view';

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
        'input': ['keyup', changeTodoTitle(todoModel)],
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
