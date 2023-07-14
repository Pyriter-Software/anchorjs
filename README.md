# Anchorjs

Dependency Injection for Nodejs. 

## Install
```console
$ npm install @pyriter/anchorjs
```

## Features

### Current
- Seamless imports with your IDE (via typescript)
- Allows named dependency 

### Upcoming
- Order of dependency should not matter 
- Infer dependency by object type
 
## Usage
Import the $install function to add objects, functions, values to the data store

```typescript
import {$install} from '@pyriter/anchorjs';

// Use $install to create a singleton or return a factory object
const foo = {
    bar: "Hello"
}
$install('foo', foo);
```

In a separate module or file use the $inject function to retrieve the desired object, function or value
```typescript
import {$inject} from '@pyriter/anchorjs';

const foo = $inject('foo');
console.log(foo.bar); // prints "Hello" to the console
```

### Using dependency injection to inject data providers
One useful thing about dependency injection is to setup your objects and then have them inject the needed dependencies on creation
```typescript
const credentials = {
  username: "username",
  password: "password"
};

$install('dataStoreProvider', new DataSourceProvider(credentials));
$install('dataSourceProvider2', new DataSourceProvider2(credentials));
```
Then in a separate file, you can create another object that uses these providers without knowing how to set them up
```typescript
class MyActionController { 
  constructor({
     dataSourceProvider = $inject('dataSourceProvider'), 
     dataSourceProvider2 = $inject('dataSourceProvider2')  
  }) {
    // constructor body
  }
}
```
Now you can create the MyActionController object without having to know how to create the 2 dataSources
```typescript
const myActionController = new MyActionController();
```
