describe('model', function () {
  var Model = bm2v.Model;
  var Bind = bm2v.Bind;
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
    model.bindPuppet('title', new Bind(['empty']));
    var cache = model.puppets.title.cache;
    expect(cache.length).toBe(1);

    model.bindPuppet('title', new Bind(['empty']));
    expect(cache.length).toBe(2);
  });
});
