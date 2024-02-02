const container: Map<string, DependencyConfig<any>> = new Map();

export interface AnchorProps<T> {
  provide: () => T;
  type?: DependencyType;
}

interface DependencyConfig<T> extends AnchorProps<T> {
  instance?: any;
}

export enum DependencyType {
  SINGLETON = 'singleton', // Creates one instance and provides it for all injections
  FACTORY = 'factory', // Creates new instances for every injection
}

export function $inject<T>(key: string): T {
  if (!container.has(key)) throw new Error(`Cannot find module ${key}. You must install it first`);
  const dependencyConfig: DependencyConfig<any> = container.get(key)!!;
  const { type, provide, instance } = dependencyConfig;
  if (type === DependencyType.FACTORY) {
    const value = provide();
    if (value == null) throw new TypeError('provide function must return a non null value');
    return value as T;
  } else {
    if (instance == null) {
      dependencyConfig.instance = provide();
      if (dependencyConfig.instance == null) throw new TypeError('provide function must return a non null value');
      container.set(key, dependencyConfig);
    }
    return dependencyConfig.instance;
  }
}

export function $install<T>(key, props: AnchorProps<T>) {
  validateKey(key);
  validateProps(props);
  container.set(key, { ...props });
}

export function $clean() {
  container.clear();
}

function validateKey(key) {
  if (key === null || key === undefined) throw new TypeError('key must be defined');
  if (!isString(key)) throw new TypeError('key must be a string, or symbol');
  if (key.length === 0) throw new TypeError('key must be a nonempty string');
  if (container.has(key))
    throw new Error(`Duplicate definition for ${key}. Only one module can exists with this name.`);
}

function isString(value) {
  return typeof value === 'string';
}

function validateProps(props) {
  if (isNullOrUndefined(props)) throw new TypeError('props must be defined');
  if (typeof props.provide !== 'function') throw new TypeError('provide must be defined and be a function');
  if (isNullOrUndefined(props.type)) {
    props.type = DependencyType.FACTORY;
  }
}

function isNullOrUndefined(value?: any): boolean {
  return value === null || value === undefined;
}
