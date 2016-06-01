describe('model', function () {
  var model, todo;
  beforeEach(function () {
    todo = {
      title: 'hello world',
      content: 'hello ...',
    };
    model = createModel(todo);
  });
  function createModel(value) {
    return new bm2v.Model(value);
  }
  it('should have a reference in `model`', function () {
    expect(model.model).toBe(todo);
  });
  it('should set `puppets` as empty object defaultly', function () {
    expect(model.puppets).toEqual({});
  });
  it('bindPuppet', function () {
    expect(model.puppets.title).toBeUndefined();
    var todoNode = document.createTextNode('hello world');
    model.bindPuppet('title', 'text', todoNode);
    var cache = model.puppets.title.cache;
    expect(cache.length).toBe(1);

    var inputNode = document.createElement('input');
    model.bindPuppet('title', 'form', inputNode);
    expect(cache.length).toBe(2);
  });
  it('update', function () {
    var text1 = 'hello world changed';
    model.update('title', text1);
    expect(model.model.title).toBe(text1);

    var todoNode = document.createTextNode('hello world');
    model.bindPuppet('title', 'text', todoNode);
    var text2 = 'hello again';
    model.update('title', text2);
    expect(model.model.title).toBe(text2);
    expect(todoNode.textContent).toBe(text2);

    var inputNode = document.createElement('input');
    model.bindPuppet('title', 'form', inputNode);
    var text3 = 'hello 3rd time';
    model.update('title', text3);
    expect(model.model.title).toBe(text3);
    expect(todoNode.textContent).toBe(text3);
    expect(inputNode.value).toBe(text3);
  });
});
