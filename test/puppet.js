describe('Puppert', function () {
  var Puppet = bm2v.Puppet;
  it('instantiate', function () {
    var puppet1 = new Puppet();
    expect(puppet1.cache.length).toBe(0);
    var textNode = document.createTextNode('hello');
    var puppet2 = new Puppet('text', textNode);
    expect(puppet2.cache.length).toBe(1);
    expect(puppet2.cache[0][0]).toBe('text');
    expect(puppet2.cache[0][1]).toBe(textNode);
  });
  it('add', function () {
    var puppet = new Puppet();
    var textNode = document.createTextNode('hello');
    puppet.add('text', textNode);
    expect(puppet.cache.length).toBe(1);
    expect(puppet.cache[0][0]).toBe('text');
    expect(puppet.cache[0][1]).toBe(textNode);
    var inputNode = document.createElement('input');
    puppet.add('form', inputNode);
    expect(puppet.cache.length).toBe(2);
    expect(puppet.cache[1][0]).toBe('form');
    expect(puppet.cache[1][1]).toBe(inputNode);
  });
});
