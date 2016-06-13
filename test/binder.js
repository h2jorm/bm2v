describe('Binderer', function () {
  var Binder = bm2v.Binder;
  it('register & cancel', function () {
    var fn = function () {};
    Binder.register('test', fn);
    expect(Binder.strategies.test).toBe(fn);
    Binder.cancel('test');
    expect(Binder.strategies.test).toBeUndefined();
  });
  it('instantiate', function () {
    var args, ctx;
    Binder.register('test', function () {
      args = Array.prototype.slice.call(arguments);
      ctx = this;
    });
    var myViewCtx = {};
    var binder = new Binder(['test', 'arg1', 'arg2'], myViewCtx);
    expect(args.length).toBe(3);
    expect(args[0]).toBe(myViewCtx);
    expect(args[1]).toBe('arg1');
    expect(args[2]).toBe('arg2');
    expect(args[3]).toBeUndefined();
    expect(ctx).toBe(binder);
    Binder.cancel('test');
  });
  it('instantiate fn', function () {
    var ctx;
    var myViewCtx = {};
    var count = 0;
    var customBehavior = function () {
      count++;
      ctx = this;
    };
    var binder = new Binder([customBehavior], myViewCtx);
    expect(count).toBe(0);
    binder.update();
    expect(ctx).toBe(myViewCtx);
    expect(count).toBe(1);
  });
});
