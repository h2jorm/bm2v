describe('BinderCache', function () {
  var BinderCache = bm2v.BinderCache;
  it('instantiate', function () {
    var binderCache1 = new BinderCache();
    expect(binderCache1.cache.length).toBe(0);
    var binderCache2 = new BinderCache('hello');
    expect(binderCache2.cache.length).toBe(1);
    expect(binderCache2.cache[0]).toBe('hello');
  });
  it('add', function () {
    var binderCache = new BinderCache();
    binderCache.add('hello');
    expect(binderCache.cache.length).toBe(1);
    expect(binderCache.cache[0]).toBe('hello');
    binderCache.add('world');
    expect(binderCache.cache.length).toBe(2);
    expect(binderCache.cache[1]).toBe('world');
  });
});
