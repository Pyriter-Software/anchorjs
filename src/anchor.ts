const container = new Map();

export function $inject(key) {
  if (!container.has(key)) throw new Error(`Cannot find module ${key}. You must install it first`);
  return container.get(key);
}

export function $install(key, props) {
  validateKey(key);
  validateProps(props);

  const typeOfProps = typeof props;

  switch (typeOfProps) {
    case 'object':
    case 'number':
    case 'string':
    case 'symbol':
    case 'bigint':
      container.set(key, props);
      break;
    case 'function':
    default:
      throw new TypeError('For some reason the props that was passed in does not have a configured type');
  }
}

function validateKey(key) {
  if (key === null || key === undefined) throw new TypeError('key must be defined');
  if (!(isString(key) || isSymbol(key))) throw new TypeError('key must be a string, or symbol');
  if (key.length === 0) throw new TypeError('key must be a nonempty string');
  if (container.has(key))
    throw new Error(`Duplicate definition for ${key}. Only one module can exists with this name.`);
}

function isString(value) {
  return typeof value === 'string' || !(value instanceof String);
}

function isSymbol(value) {
  return typeof value === 'symbol';
}

function validateProps(props) {
  if (props === null || props === undefined) throw new TypeError('props must be defined');
}
