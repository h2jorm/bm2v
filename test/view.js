describe('View', function () {
  var View = bm2v.View;
  it('template', function () {
    var template = '<div>hello world</div>';
    var view = new View({
      template: template,
    });
    var viewDom = document.createElement('div');
    viewDom.appendChild(view.dom);
    expect(viewDom.innerHTML).toBe(template);
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
      expect(view.dom.querySelector('[data-model="title"]').textContent).toBe(todoModel.model.title);

      var contentCache = todoModel.puppets.content.cache;
      expect(contentCache.length).toBe(1);
      expect(contentCache[0][0]).toBe('form');
      expect(contentCache[0][1]).toBe(view.dom.querySelector('input'));
      expect(view.dom.querySelector('input').value).toBe(todoModel.model.content);
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
      expect(view.dom.querySelector('[data-model="title"]').textContent).toBe(todoModel.model.title);
      expect(cache[1][0]).toBe('form');
      expect(cache[1][1]).toBe(view.dom.querySelector('input'));
      expect(view.dom.querySelector('input').value).toBe(todoModel.model.title);
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
      expect(todoTitleCache[0][1].parentNode.textContent).toBe(todoModel.model.title);
      expect(personNameCache.length).toBe(1);
      expect(personNameCache[0][0]).toBe('text');
      expect(personNameCache[0][1].parentNode).toBe(view.dom.querySelector('[data-model="personName"]'));
      expect(personNameCache[0][1].parentNode.textContent).toBe(personModel.model.name);
    });
  });
  it('events', function () {
    var template = '<div>click me</div>';
    var count = 0;
    var view = new View({
      template: template,
      events: {
        'div': ['click', function () {count++;}],
      },
    });
    expect(count).toBe(0);
    view.dom.querySelector('div').click();
    expect(count).toBe(1);
  });
});
