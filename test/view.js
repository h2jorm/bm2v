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
        var dom = document.createElement('li');
        dom.textContent = 'hello';
        view.append('div', dom);
      }
      function invalid4() {
        view.append('ul', 12);
      }
      expect(invalid1).toThrow();
      expect(invalid2).toThrow();
      expect(invalid3).toThrow();
      expect(invalid4).toThrow();
    });
  });
  describe('models', function () {
    var Model = bm2v.Model;
    it('1 model - 1 key - node', function () {
      var template = '<li><span data-model="title"></span></li>';
      var todoModel = new Model({
        title: 'hello world',
      });
      var view = new View({
        template: template,
        models: [
          {
            model: todoModel,
            bind: {
              title: [
                ['text', '[data-model="title"]'],
              ],
            },
          },
        ],
      });
      var cache = todoModel.puppets.title.cache;
      expect(cache.length).toBe(1);
      expect(cache[0][0]).toBe('text');
      expect(cache[0][1].parentNode).toBe(view.dom.querySelector('[data-model="title"]'));
    });
    it('1 model - >1 key', function () {
      var template = '<li><span data-model="title"></span><input></li>';
      var todoModel = new Model({
        title: 'hello world',
        content: 'hello...',
      });
      var view = new View({
        template: template,
        models: [
          {
            model: todoModel,
            bind: {
              title: [
                ['text', '[data-model="title"]'],
              ],
              content: [
                ['form', 'input'],
              ],
            },
          },
        ],
      });
      var titleCache = todoModel.puppets.title.cache;
      expect(titleCache.length).toBe(1);
      expect(titleCache[0][0]).toBe('text');
      expect(titleCache[0][1].parentNode).toBe(view.dom.querySelector('[data-model="title"]'));
      expect(view.dom.querySelector('[data-model="title"]').textContent).toBe(todoModel.get('title'));

      var contentCache = todoModel.puppets.content.cache;
      expect(contentCache.length).toBe(1);
      expect(contentCache[0][0]).toBe('form');
      expect(contentCache[0][1]).toBe(view.dom.querySelector('input'));
      expect(view.dom.querySelector('input').value).toBe(todoModel.get('content'));
    });
    it('1 model - 1 key - >1 nodes', function () {
      var template = '<li><span data-model="title"></span><input></li>';
      var todoModel = new Model({
        title: 'hello world',
      });
      var view = new View({
        template: template,
        models: [
          {
            model: todoModel,
            bind: {
              title: [
                ['text', '[data-model="title"]'],
                ['form', 'input'],
              ],
            },
          },
        ],
      });
      var cache = todoModel.puppets.title.cache;
      expect(cache.length).toBe(2);
      expect(cache[0][0]).toBe('text');
      expect(cache[0][1].parentNode).toBe(view.dom.querySelector('[data-model="title"]'));
      expect(view.dom.querySelector('[data-model="title"]').textContent).toBe(todoModel.get('title'));
      expect(cache[1][0]).toBe('form');
      expect(cache[1][1]).toBe(view.dom.querySelector('input'));
      expect(view.dom.querySelector('input').value).toBe(todoModel.get('title'));
    });
    it('>1 models', function () {
      var template = '<li><span data-model="title"></span><span data-model="personName"></span></li>';
      var todoModel = new Model({
        title: 'hello',
      });
      var personModel = new Model({
        name: 'leeching',
      });
      var view = new View({
        template: template,
        models: [
          {
            model: todoModel,
            bind: {
              title: [
                ['text', '[data-model="title"]'],
              ],
            },
          },
          {
            model: personModel,
            bind: {
              name: [
                ['text', '[data-model="personName"]'],
              ],
            },
          },
        ],
      });

      var todoTitleCache = todoModel.puppets.title.cache;
      var personNameCache = personModel.puppets.name.cache;
      expect(todoTitleCache.length).toBe(1);
      expect(todoTitleCache[0][0]).toBe('text');
      expect(todoTitleCache[0][1].parentNode).toBe(view.dom.querySelector('[data-model="title"]'));
      expect(todoTitleCache[0][1].parentNode.textContent).toBe(todoModel.get('title'));
      expect(personNameCache.length).toBe(1);
      expect(personNameCache[0][0]).toBe('text');
      expect(personNameCache[0][1].parentNode).toBe(view.dom.querySelector('[data-model="personName"]'));
      expect(personNameCache[0][1].parentNode.textContent).toBe(personModel.get('name'));
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
});
