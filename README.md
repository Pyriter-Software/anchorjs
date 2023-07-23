# Anchorjs

Dependency injection for Nodejs.

## Install

```bash
npm install @pyriter/anchorjs
```

## Features

- Seamless imports with your IDE (via typescript)
- Allows named dependency
- Order of $install does not matter
- Infer dependency injection by object type

## Usage

Import the $install function to add objects, functions, values to the anchor module 

```typescript
import { $install } from '@pyriter/anchorjs';

declare type Foo = {
  bar: string
};
const myValue: Foo = {
  bar: "foobar"  
};

$install("foo", {
  provide: () => myValue,
  type: DependencyType.SINGLETON, 
});
```

In a separate module or file use the $inject function to retrieve the desired object, function or value

```typescript
import { $inject } from '@pyriter/anchorjs';

const foo = $inject<string>('foo');
console.log(foo.bar); // prints "foobar" to the console
```

### Using dependency injection to inject data providers

One useful thing about dependency injection is to setup your objects and then have them inject the needed dependencies
on creation

```typescript
import { DependencyType } from "./anchor";

const credentials = {
  username: "username",
  password: "password"
};

$install('dataStoreProvider', {
  provide: () => new DataSourceProvider(credentials),
  type: DependencyType.FACTORY
});
```

Then in a separate file, you can create another object that uses these providers without knowing how to set them up

```typescript
class MyActionController {
  constructor(dataSourceProvider = $inject<DataSourceProvider>("dataSourceProvider")) {
  }
 
  public async getCredentials(): Promise<DataItem> {
    return this.dataSourceProvider.getCredentials();
  }
}
```

Now you can create the MyActionController object without having to know how to create the 2 dataSources

```typescript
const myActionController = new MyActionController();
```
