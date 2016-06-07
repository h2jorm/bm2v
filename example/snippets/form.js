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
            ['json', 'pre'],
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
            ['json', 'pre'],
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
