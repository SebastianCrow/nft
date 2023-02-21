import { truncatePositive } from './numbers.util';

describe('numbers.util', () => {
  describe('truncatePositive', () => {
    it('truncates positive numbers correctly', () => {
      expect(truncatePositive(1, 1).toString()).toStrictEqual('1');
      expect(truncatePositive(1.2, 1).toString()).toStrictEqual('1.2');
      expect(truncatePositive(1.21, 1).toString()).toStrictEqual('1.2');
      expect(truncatePositive(1.29, 1).toString()).toStrictEqual('1.2');
    });

    it('truncates zero correctly', () => {
      expect(truncatePositive(0, 1).toString()).toStrictEqual('0');
    });

    it('throws on negative number', () => {
      expect(() => truncatePositive(-1, 1)).toThrowError(
        'Function `truncatePositive` works only for positive numbers'
      );
    });
  });
});
