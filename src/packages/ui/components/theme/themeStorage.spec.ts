import { getStorageTheme, Theme } from './themeStorage';

describe('getStorageTheme', () => {
  it('returns dark theme by default', () => {
    expect(getStorageTheme()).toStrictEqual(Theme.Dark);
  });

  it('returns light theme from storage', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValueOnce(Theme.Light);
    expect(getStorageTheme()).toStrictEqual(Theme.Light);
  });
});
