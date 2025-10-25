const container: Map<string | symbol, DependencyConfig<any>> = new Map();
let allowKeyOverridesOnInstall = false;

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

export function $inject<T>(key: string | symbol): T {
  if (!container.has(key)) throw new Error(`Cannot find module ${String(key)}. You must install it first`);
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

export function $configure(options: { allowDuplicateKeys: boolean }) {
  allowKeyOverridesOnInstall = options.allowDuplicateKeys;
}

function validateKey(key) {
  if (key === null || key === undefined) throw new TypeError('key must be defined');
  if (!(isANonEmptyString(key) || isASymbol(key))) throw new TypeError('key must be a non empty string, or symbol');
  if (!allowKeyOverridesOnInstall && container.has(key))
    throw new Error(`Duplicate definition for ${key}. Only one module can exists with this name.`);
}

function isString(value: any): boolean {
  return typeof value === 'string' || value instanceof String;
}

function isASymbol(value: any): boolean {
  // @ts-ignore
  return typeof value === 'symbol' || value instanceof Symbol;
}

function isANonEmptyString(value): boolean {
  return isString(value) && value.length > 0;
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
