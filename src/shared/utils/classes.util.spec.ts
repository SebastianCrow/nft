import { classes } from './classes.util';

describe('classes', () => {
  it('joins classes', () => {
    expect(classes('a', 'b', 'c')).toStrictEqual('a b c');
  });

  it('omits empty classes', () => {
    expect(classes('a', '', 'c')).toStrictEqual('a c');
    expect(classes()).toStrictEqual('');
  });

  it('omits undefined classes', () => {
    expect(classes('a', undefined, 'c')).toStrictEqual('a c');
  });
});
