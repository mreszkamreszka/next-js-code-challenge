import cn from './cn';

describe('cn', () => {
  it('should concatenate class names', () => {
    const result = cn('class1', 'class2', 'class3');
    expect(result).toBe('class1 class2 class3');
  });

  it('should filter out falsy values', () => {
    const result = cn('class1', null, 'class2', undefined, 'class3', '');
    expect(result).toBe('class1 class2 class3');
  });
});
