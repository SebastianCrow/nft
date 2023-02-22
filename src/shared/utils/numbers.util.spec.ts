import { truncatePositive } from './numbers.util';

describe('truncatePositive', () => {
  it('truncates positive numbers', () => {
    expect(truncatePositive(100, 1)).toStrictEqual(100);

    expect(truncatePositive(100.2, 1)).toStrictEqual(100.2);
    expect(truncatePositive(100.21, 1)).toStrictEqual(100.2);
    expect(truncatePositive(100.29, 1)).toStrictEqual(100.2);

    expect(truncatePositive(100.2, 2)).toStrictEqual(100.2);
    expect(truncatePositive(100.21, 2)).toStrictEqual(100.21);
    expect(truncatePositive(100.29, 2)).toStrictEqual(100.29);

    expect(truncatePositive(100.2, 3)).toStrictEqual(100.2);
    expect(truncatePositive(100.21, 3)).toStrictEqual(100.21);
    expect(truncatePositive(100.29, 3)).toStrictEqual(100.29);

    expect(truncatePositive(100.2, 2)).toStrictEqual(100.2);
    expect(truncatePositive(100.201, 2)).toStrictEqual(100.2);
    expect(truncatePositive(100.299, 2)).toStrictEqual(100.29);
  });

  it('truncates positive numbers to zero places', () => {
    expect(truncatePositive(100, 0)).toStrictEqual(100);
    expect(truncatePositive(100.2, 0)).toStrictEqual(100);
    expect(truncatePositive(100.21, 0)).toStrictEqual(100);
    expect(truncatePositive(100.29, 0)).toStrictEqual(100);
  });

  it('truncates zero number', () => {
    expect(truncatePositive(0.0, 1)).toStrictEqual(0);
    expect(truncatePositive(0.0, 2)).toStrictEqual(0);
    expect(truncatePositive(0.0, 3)).toStrictEqual(0);
  });

  it('throws on negative number', () => {
    expect(() => truncatePositive(-1, 1)).toThrowError(
      'Function `truncatePositive` works only for positive numbers'
    );
  });

  it('throws on negative places', () => {
    expect(() => truncatePositive(1, -1)).toThrowError(
      '`places` cannot be a negative value'
    );
  });
});
