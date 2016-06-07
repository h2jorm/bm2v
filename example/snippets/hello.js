// example: hello
(function hello() {
  var helloExample = document.getElementById('hello');
  var helloModel = new Model({
    name: '',
    show: true,
  });
  var tmpl = '<button>toggle</button>name: <input><div data-message>hello, <span data-model="name"></span></div>';
  var view = new View({
    template: tmpl,
    model: helloModel,
    bind: {
      name: [
        ['text', '[data-model="name"]'],
      ],
      show: [
        ['if', '[data-message]'],
      ],
    },
    events: {
      'input': ['keyup', function (event) {
        var newName = event.currentTarget.value;
        helloModel.update('name', newName);
      }],
      'button': ['click', function (event) {
        helloModel.update('show', !helloModel.get('show'));
      }],
    },
  });
  helloExample.appendChild(view.dom);
  pushSnippet(hello);
})();
