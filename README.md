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

## Glossary

* model: a simple wrap of a plain old javascript object
* view: binding models and events to a custom template
* binder: a transformer declaring how models displayed in views
* binder cog: binder configurations, like `['text', '[data-model="name"]']`
* key binder: a binder updating value of a model key
* model binder: a binder updating value of whole model
