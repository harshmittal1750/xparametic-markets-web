import arrsAreEqual from './arrsAreEqual';

const defaults = {
  arr1: ['foo', 'bar', 1.618],
  arr2: ['foz', 'baz', 0.618]
};

describe('arrsAreEqual', () => {
  it('returns true if both Array arguments are equal', () => {
    const areArrEqual = arrsAreEqual(defaults.arr1, defaults.arr1);

    expect(areArrEqual).toBe(true);
  });
  it('returns false if both Array arguments are not equal', () => {
    const areArrEqual = arrsAreEqual(defaults.arr1, defaults.arr2);

    expect(areArrEqual).toBe(false);
  });
});
