describe('model', function () {
  var Model = bm2v.Model;
  var Binder = bm2v.Binder;
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
  it('should set `cache` as empty object defaultly', function () {
    expect(model.cache).toEqual({});
  });
  it('cacheBinder', function () {
    expect(model.cache.title).toBeUndefined();
    model.cacheBinder('title', new Binder(['empty']));
    var cache = model.cache.title.cache;
    expect(cache.length).toBe(1);

    model.cacheBinder('title', new Binder(['empty']));
    expect(cache.length).toBe(2);
  });
});
