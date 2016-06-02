describe('Bind', function () {
  var Bind = bm2v.Bind;
  it('register & cancel', function () {
    var fn = function () {};
    Bind.register('test', fn);
    expect(Bind.strategies.test).toBe(fn);
    Bind.cancel('test');
    expect(Bind.strategies.test).toBeUndefined();
  });
  it('instantiate', function () {
    var args, ctx;
    Bind.register('test', function () {
      args = Array.prototype.slice.call(arguments);
      ctx = this;
    });
    var myViewCtx = {};
    var bind = new Bind(['test', 'arg1', 'arg2'], myViewCtx);
    expect(args.length).toBe(3);
    expect(args[0]).toBe(myViewCtx);
    expect(args[1]).toBe('arg1');
    expect(args[2]).toBe('arg2');
    expect(args[3]).toBeUndefined();
    expect(ctx).toBe(bind);
    Bind.cancel('test');
  });
});
