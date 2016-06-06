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
  it('get', function () {
    expect(model.get('title')).toBe('hello world');
    expect(model.get('content')).toBe('hello ...');
    expect(model.get()).toEqual({
      title: 'hello world',
      content: 'hello ...',
    });
  });
  describe('update', function () {
    var count;
    beforeAll(function () {
      // binderForModelUpdateTest
      Binder.register('BFMUT', function () {
        this.update = function () {
          count++;
        };
      });
    });
    afterAll(function () {
      Binder.cancel('BFMUT');
    });
    beforeEach(function () {
      count = 0;
    });
    it('when `key` is a normal string', function () {
      model.update('title', 'hello');
      expect(model.get('title')).toBe('hello');
    });
    it('when `key` is an empty string', function () {
      model.update('', {
        title: 'hi',
        content: 'atom',
      });
      expect(model.get()).toEqual({
        title: 'hi', content: 'atom',
      });
    });
    it('model binder', function () {
      model.cacheBinder('title', new Binder(['BFMUT']));
      model.update('title', 'hello');
      expect(count).toBe(1);
      model.cacheBinder('', new Binder(['BFMUT']));
      model.update('title', 'hello');
      expect(count).toBe(3);
    });
  });
  describe('updateCollection', function () {
    var count;
    beforeAll(function () {
      // binderForModelUpdateCollectionTest
      Binder.register('BFMUCT', function () {
        this.update = function () {
          count++;
        };
      });
    });
    afterAll(function () {
      Binder.cancel('BFMUCT');
    });
    beforeEach(function () {
      count = 0;
      model = new Model({
        todos: [
          {title: 'hello', done: false},
          {title: 'world', done: true},
        ],
      });
    });
    it('when `key` is a normal string', function () {
      model.updateCollection('todos', 2, {
        title: 'hi', done: false,
      });
      expect(model.get('todos').length).toBe(3);
    });
    it('when `key` is an empty string', function () {
      model = new Model([
        {title: 'hello', done: false},
        {title: 'world', done: true},
      ]);
      model.updateCollection('', 2, {
        title: 'hi',
      });
      expect(model.get().length).toBe(3);
    });
    it('model binder', function () {
      model.cacheBinder('todos', new Binder(['BFMUCT']));
      model.updateCollection('todos', 2, {title: 'hello'});
      expect(count).toBe(1);
      model.cacheBinder('', new Binder(['BFMUCT']));
      model.updateCollection('todos', 2, {title: 'hello'});
      expect(count).toBe(3);
    });
  });
});
