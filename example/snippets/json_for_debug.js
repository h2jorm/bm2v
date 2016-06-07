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
  var inputView = new View({
    template: '<div><input data-name="name"></div><div><input data-name="frameworks"></div><button>change</button><pre></pre>',
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
          '': [
            ['json', 'pre'],
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
  json.appendChild(inputView.dom);
})();
