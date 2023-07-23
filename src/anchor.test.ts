import { $clean, $inject, $install, DependencyType } from './anchor';

describe('anchor', () => {
  const key = 'key';
  afterEach(() => {
    $clean();
  });
  test('given a valid number, when called to inject factory, it should retrieve it', () => {
    const expected = 1;
    $install(key, {
      provide: () => expected,
      type: DependencyType.FACTORY,
    });
    const actual = $inject(key);
    expect(actual).toEqual(expected);
  });
  test('given a valid number, when called to inject singleton, it should retrieve it', () => {
    const expected = 1;
    $install(key, {
      provide: () => expected,
      type: DependencyType.SINGLETON,
    });
    const actual = $inject(key);
    expect(actual).toEqual(expected);
  });
  test('given a valid string, when called to inject factory, it should retrieve it', () => {
    const expected = 'test';
    $install(key, {
      provide: () => expected,
      type: DependencyType.FACTORY,
    });
    const actual = $inject(key);
    expect(actual).toEqual(expected);
  });
  test('given a valid string, when called to inject singleton, it should retrieve it', () => {
    const expected = 'test';
    $install(key, {
      provide: () => expected,
      type: DependencyType.SINGLETON,
    });
    const actual = $inject(key);
    expect(actual).toEqual(expected);
  });
  test('given a valid object, when called to inject factory, it should retrieve it', () => {
    const expected = { value: 'hello' };
    $install(key, {
      provide: () => expected,
      type: DependencyType.FACTORY,
    });
    const actual = $inject(key);
    expect(actual).toEqual(expected);
  });
  test('given a valid object, when called to inject singleton, it should retrieve it', () => {
    const expected = { value: 'hello' };
    $install(key, {
      provide: () => expected,
      type: DependencyType.SINGLETON,
    });
    const actual = $inject(key);
    expect(actual).toEqual(expected);
  });
  test('given a valid symbol, when called to inject factory, it should retrieve it', () => {
    const expected = Symbol();
    $install(key, {
      provide: () => expected,
      type: DependencyType.FACTORY,
    });
    const actual = $inject(key);
    expect(actual).toEqual(expected);
  });
  test('given a valid symbol, when called to inject singleton, it should retrieve it', () => {
    const expected = Symbol();
    $install(key, {
      provide: () => expected,
      type: DependencyType.SINGLETON,
    });
    const actual = $inject(key);
    expect(actual).toEqual(expected);
  });
  test('given a valid biginit, when called to inject factory, it should retrieve it', () => {
    const expected = BigInt(123);
    $install(key, {
      provide: () => expected,
      type: DependencyType.FACTORY,
    });
    const actual = $inject(key);
    expect(actual).toEqual(expected);
  });
  test('given a valid biginit, when called to inject singleton, it should retrieve it', () => {
    const expected = BigInt(123);
    $install(key, {
      provide: () => expected,
      type: DependencyType.SINGLETON,
    });
    const actual = $inject(key);
    expect(actual).toEqual(expected);
  });
});
