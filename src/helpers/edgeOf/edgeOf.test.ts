import edgeOf from './edgeOf';
import { edgeOfMock } from './edgeOf.util';

describe('edgeOf', () => {
  it('should return the first and last element of an Array', () => {
    const [start, end] = edgeOf(edgeOfMock);

    expect(start).toBe(edgeOfMock[0]);
    expect(end).toBe(edgeOfMock.slice(-1)[0]);
  });
});
