import { ensureDefined } from './typescript.util';

describe('ensureDefined', () => {
  it('does not throw on defined (empty string) value', () => {
    expect(() => ensureDefined('')).not.toThrow();
  });

  it('throws on `undefined` value', () => {
    expect(() => ensureDefined(undefined)).toThrowError(
      'Value needs to be defined'
    );
  });

  it('throws on `null` value', () => {
    expect(() => ensureDefined(null)).toThrowError('Value needs to be defined');
  });
});
