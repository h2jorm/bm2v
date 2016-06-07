// example: hello
(function hello() {
  var helloExample = document.getElementById('hello');
  var helloModel = new Model({
    name: '',
  });
  var tmpl = 'name: <input><div>hello, <span data-model="name"></span></div>';
  var view = new View({
    template: tmpl,
    model: helloModel,
    bind: {
      name: [
        ['text', '[data-model="name"]'],
      ],
    },
    events: {
      'input': ['keyup', function (event) {
        var newName = event.currentTarget.value;
        helloModel.update('name', newName);
      }],
    }
  });
  helloExample.appendChild(view.dom);
  pushSnippet(hello);
})();
