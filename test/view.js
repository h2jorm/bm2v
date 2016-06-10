describe('View', function () {
  var View = bm2v.View;
  it('template', function () {
    var template1 = '<div>hello world</div>';
    var view1 = new View({
      template: template1,
    });
    expect(getViewHtml(view1)).toBe(template1);

    var template2 = 'hello';
    var view2 = new View({
      template: template2,
    });
    expect(getViewHtml(view2)).toBe('<div>hello</div>');

    function getViewHtml(view) {
      var div = document.createElement('div');
      div.appendChild(view.dom);
      return div.innerHTML;
    }
  });
  it('query', function () {
    var view1 = new View({
      template: '<li>hello</li>',
    });
    expect(view1.query('li').length).toBe(1);
    expect(view1.query().length).toBe(1);
    expect(view1.query()[0]).toBe(view1.dom);
    var view2 = new View({
      template: '<div><span>hello</span><span>world</span></div>',
    });
    expect(view2.query('span').length).toBe(2);
  });
  describe('append', function () {
    var view;
    var template = '<div><ul></ul></div>';
    beforeEach(function () {
      view = new View({
        template: template,
      });
    });
    it('2 parameters - view', function () {
      var innerView = new View({
        template: '<li>hello world</li>'
      });
      view.append('ul', innerView);
      expect(view.dom.innerHTML).toBe('<ul><li>hello world</li></ul>');
      expect(view.children.length).toBe(1);
      expect(view.children[0]).toBe(innerView);
      expect(innerView.parent).toBe(view);
    });
    it('2 parameters - dom', function () {
      var dom = document.createElement('li');
      dom.textContent = 'hello';
      view.append('ul', dom);
      expect(view.dom.innerHTML).toBe('<ul><li>hello</li></ul>');
    });
    it('1 parameter', function () {
      var dom = document.createElement('li');
      dom.textContent = 'hello';
      view.append(dom);
      expect(view.dom.innerHTML).toBe('<ul></ul><li>hello</li>');
    });
    it('invalid', function () {
      function invalid1() {
        view.append();
      }
      function invalid2() {
        view.append('ul');
      }
      function invalid3() {
        view.append('ul', 12);
      }
      expect(invalid1).toThrow();
      expect(invalid2).toThrow();
      expect(invalid3).toThrow();
    });
  });
  describe('models', function () {
    var Model = bm2v.Model;
    function getText(view, selector) {
      return view.query(selector)[0].textContent;
    }
    it('1 model - 1 key - node', function () {
      var template = '<li><span data-model="title"></span></li>';
      var todoModel = new Model({
        title: 'hello world',
      });
      var titleSelector = '[data-model="title"]';
      var view = new View({
        template: template,
        models: [
          {
            model: todoModel,
            bind: {
              title: [
                ['text', titleSelector],
              ],
            },
          },
        ],
      });
      expect(todoModel.cache.title.cache.length).toBe(1);
      expect(getText(view, titleSelector)).toBe('hello world');
      todoModel.update('title', 'hello again');
      expect(getText(view, titleSelector)).toBe('hello again');
    });
    it('1 model - >1 key', function () {
      var template = '<li><span data-model="title"></span><span data-model="content"></span></li>';
      var todoModel = new Model({
        title: 'hello world',
        content: 'hello...',
      });
      var titleSelector = '[data-model="title"]';
      var contentSelector = '[data-model="content"]';
      var view = new View({
        template: template,
        models: [
          {
            model: todoModel,
            bind: {
              title: [
                ['text', titleSelector],
              ],
              content: [
                ['text', contentSelector],
              ],
            },
          },
        ],
      });
      expect(todoModel.cache.title.cache.length).toBe(1);
      expect(todoModel.cache.content.cache.length).toBe(1);
      expect(getText(view, titleSelector)).toBe('hello world');
      expect(getText(view, contentSelector)).toBe('hello...');
      todoModel.update('title', 'hello title');
      expect(getText(view, titleSelector)).toBe('hello title');
      expect(getText(view, contentSelector)).toBe('hello...');
      todoModel.update('content', 'hello content');
      expect(getText(view, titleSelector)).toBe('hello title');
      expect(getText(view, contentSelector)).toBe('hello content');
    });
    it('1 model - 1 key - >1 nodes', function () {
      var template = '<li><span data-model="title1"></span><span data-model="title2"></span></li>';
      var todoModel = new Model({
        title: 'hello world',
      });
      var titleSelector1 = '[data-model="title1"]';
      var titleSelector2 = '[data-model="title2"]';
      var view = new View({
        template: template,
        models: [
          {
            model: todoModel,
            bind: {
              title: [
                ['text', titleSelector1],
                ['text', titleSelector2],
              ],
            },
          },
        ],
      });
      expect(todoModel.cache.title.cache.length).toBe(2);
      expect(getText(view, titleSelector1)).toBe('hello world');
      expect(getText(view, titleSelector2)).toBe('hello world');
      todoModel.update('title', 'hello title');
      expect(getText(view, titleSelector1)).toBe('hello title');
      expect(getText(view, titleSelector2)).toBe('hello title');
    });
    it('>1 models', function () {
      var template = '<li><span data-model="title"></span><span data-model="personName"></span></li>';
      var todoModel = new Model({
        title: 'hello',
      });
      var personModel = new Model({
        name: 'leeching',
      });
      var titleSelector = '[data-model="title"]';
      var nameSelector = '[data-model="personName"]';
      var view = new View({
        template: template,
        models: [
          {
            model: todoModel,
            bind: {
              title: [
                ['text', titleSelector],
              ],
            },
          },
          {
            model: personModel,
            bind: {
              name: [
                ['text', nameSelector],
              ],
            },
          },
        ],
      });
      expect(todoModel.cache.title.cache.length).toBe(1);
      expect(personModel.cache.name.cache.length).toBe(1);
      expect(getText(view, titleSelector)).toBe('hello');
      expect(getText(view, nameSelector)).toBe('leeching');
      todoModel.update('title', 'hello title');
      expect(getText(view, titleSelector)).toBe('hello title');
      expect(getText(view, nameSelector)).toBe('leeching');
      personModel.update('name', 'another one');
      expect(getText(view, titleSelector)).toBe('hello title');
      expect(getText(view, nameSelector)).toBe('another one');
    });
  });
  describe('model & bind', function () {
    var Model = bm2v.Model;
    it('model & bind', function () {
      var model = new Model({
        name: 'hello',
      });
      var view = new View({
        template: '<div></div>',
        model: model,
        bind: {
          name: [
            ['text', 'div'],
          ],
        },
      });
      expect(model.cache.name.cache.length).toBe(1);
    });
    it('when both model and models exist', function () {
      var model = new Model({
        name: 'hello',
      });
      var view = new View({
        template: '<div></div>',
        model: model,
        bind: {
          name: [
            ['text', 'div'],
          ],
        },
        models: [
          {
            model: model,
            bind: {
              name: [
                ['text', 'div'],
              ],
            },
          },
        ],
      });
      expect(model.cache.name.cache.length).toBe(1);
    });
  });
  it('events', function () {
    var template = '<div>add 1<button>add 2</button></div>';
    var count = 0;
    var view = new View({
      template: template,
      events: {
        '': ['click', function () {count++;}],
        'button': ['click', function (event) {
          event.stopPropagation();
          count += 2;
        }],
      },
    });
    expect(count).toBe(0);
    view.dom.click();
    expect(count).toBe(1);
    view.dom.querySelector('button').click();
    expect(count).toBe(3);
  });
  it('emit', function () {
    var count1 = 0;
    var count2 = 0;
    var gParentView = new View({
      template: '<div data-grandparent></div>',
      on: {
        HELLO: function () {
          count1++;
        },
      },
    });
    var parentView = new View({
      template: '<div data-parent></div>',
      on: {
        HELLO: function () {
          count2++;
        },
      },
    });
    var childView = new View({
      template: '<div data-child></div>'
    });
    expect(count1).toBe(0);
    expect(count2).toBe(0);
    gParentView.append(parentView);
    parentView.append(childView);
    childView.emit('HELLO');
    expect(count1).toBe(1);
    expect(count2).toBe(1);
  });
  it('broadcast', function () {
    var count1 = 0;
    var count2 = 0;
    var count3 = 0;
    var parentView = new View({
      template: '<div data-parent></div>',
    });
    var childView1 = new View({
      template: '<div data-child></div>',
      on: {
        HELLO: function () {
          count1++;
        },
      },
    });
    var childView2 = new View({
      template: '<div data-child></div>',
      on: {
        HELLO: function () {
          count2++;
        },
      },
    });
    var gChildView = new View({
      template: '<div data-grandchild></div>',
      on: {
        HELLO: function () {
          count3++;
        },
      },
    });
    parentView.broadcast('HELLO');
    expect(count1).toBe(0);
    expect(count2).toBe(0);
    expect(count3).toBe(0);
    parentView.append(childView1);
    parentView.append(childView2);
    childView1.append(gChildView);
    parentView.broadcast('HELLO');
    expect(count1).toBe(1);
    expect(count2).toBe(1);
    expect(count3).toBe(1);
  });
});
