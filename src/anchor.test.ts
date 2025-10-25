import { $clean, $inject, $install, $configure, DependencyType } from './anchor';

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
    const actual = $inject<number>(key);
    expect(actual).toEqual(expected);
  });
  test('given a valid number, when called to inject singleton, it should retrieve it', () => {
    const expected = 1;
    $install(key, {
      provide: () => expected,
      type: DependencyType.SINGLETON,
    });
    const actual = $inject<number>(key);
    expect(actual).toEqual(expected);
  });
  test('given a valid string, when called to inject factory, it should retrieve it', () => {
    const expected = 'test';
    $install(key, {
      provide: () => expected,
      type: DependencyType.FACTORY,
    });
    const actual = $inject<string>(key);
    expect(actual).toEqual(expected);
  });
  test('given a valid string, when called to inject singleton, it should retrieve it', () => {
    const expected = 'test';
    $install(key, {
      provide: () => expected,
      type: DependencyType.SINGLETON,
    });
    const actual = $inject<string>(key);
    expect(actual).toEqual(expected);
  });
  test('given a valid object, when called to inject factory, it should retrieve it', () => {
    type World = { value: string };
    const expected: World = { value: 'hello' };
    $install(key, {
      provide: () => expected,
      type: DependencyType.FACTORY,
    });
    const actual = $inject<World>(key);
    expect(actual).toEqual(expected);
  });
  test('given a valid object, when called to inject singleton, it should retrieve it', () => {
    type World = { value: string };
    const expected: World = { value: 'hello' };
    $install(key, {
      provide: () => expected,
      type: DependencyType.SINGLETON,
    });
    const actual = $inject<World>(key);
    expect(actual).toEqual(expected);
  });
  test('given a valid symbol, when called to inject factory, it should retrieve it', () => {
    const expected = Symbol();
    $install(key, {
      provide: () => expected,
      type: DependencyType.FACTORY,
    });
    const actual = $inject<symbol>(key);
    expect(actual).toEqual(expected);
  });
  test('given a valid symbol, when called to inject singleton, it should retrieve it', () => {
    const expected = Symbol();
    $install(key, {
      provide: () => expected,
      type: DependencyType.SINGLETON,
    });
    const actual = $inject<symbol>(key);
    expect(actual).toEqual(expected);
  });
  test('given a valid biginit, when called to inject factory, it should retrieve it', () => {
    const expected = BigInt(123);
    $install(key, {
      provide: () => expected,
      type: DependencyType.FACTORY,
    });
    const actual = $inject<bigint>(key);
    expect(actual).toEqual(expected);
  });
  test('given a valid biginit, when called to inject singleton, it should retrieve it', () => {
    const expected = BigInt(123);
    $install(key, {
      provide: () => expected,
      type: DependencyType.SINGLETON,
    });
    const actual = $inject<bigint>(key);
    expect(actual).toEqual(expected);
  });

  test('given a valid number, when called to inject singleton using symbol, it should retrieve it', () => {
    const expected = 1;
    const key = Symbol();
    $install(key, {
      provide: () => expected,
      type: DependencyType.SINGLETON,
    });
    const actual = $inject<number>(key);
    expect(actual).toEqual(expected);
  });

  test('given duplicate keys disabled, when installing same key twice, it should throw error', () => {
    $install(key, { provide: () => 1 });
    expect(() => $install(key, { provide: () => 2 })).toThrow('Duplicate definition');
  });

  test('given duplicate keys enabled, when installing same key twice, it should allow override', () => {
    $configure({ allowDuplicateKeys: true });
    $install(key, { provide: () => 1 });
    $install(key, { provide: () => 2 });
    expect($inject<number>(key)).toBe(2);
  });
});
