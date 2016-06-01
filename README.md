# bm2v

`bm2v` means bind models to views.

## How to use

```js
import {Model, View} from 'bm2v';

const app = document.getElementById('app');
const helloModel = new Model({
  myName: '',
});
const view = new View({
  template: 'name: <input><div>hello, <span data-model="name"></span></div>',
  models: [
    {
      model: helloModel,
      bind: {
        myName: [
          ['text', '[data-model="name"]'],
          ['form', 'input'],
        ],
      },
    },
  ],
  events: {
    'input': ['keyup', function (event) {
      const newName = event.currentTarget.value;
      helloModel.update('name', newName);
    }],
  }
});
app.appendChild(view.dom);
```
