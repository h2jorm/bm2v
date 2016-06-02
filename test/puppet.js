describe('Puppert', function () {
  var Puppet = bm2v.Puppet;
  it('instantiate', function () {
    var puppet1 = new Puppet();
    expect(puppet1.cache.length).toBe(0);
    var puppet2 = new Puppet('hello');
    expect(puppet2.cache.length).toBe(1);
    expect(puppet2.cache[0]).toBe('hello');
  });
  it('add', function () {
    var puppet = new Puppet();
    puppet.add('hello');
    expect(puppet.cache.length).toBe(1);
    expect(puppet.cache[0]).toBe('hello');
    puppet.add('world');
    expect(puppet.cache.length).toBe(2);
    expect(puppet.cache[1]).toBe('world');
  });
});
