# r-socs-core

This is an experimental library to be published soon.

## What does the library do?

It makes instance methods of a subtree of React components available as injected props to a consumer component.

## Why such a library?

To make separation of concern practical through composition easier than HoC.


## How to use it?

### Install the library

npm install --save r-socs-core

### Import artefacts of the libary

```javascript
import {
    Collector,
	withCollector,
	connect
} from 'r-socs-core';
```

### Collect service component

See how to create a concrete Collector by extending the generic one in `src/test-helpers/SimpleLogic/SimpleLogicCollector.js` .

See an example of logic component which provides the methods to be collected in `src/test-helpers/SimpleLogic/SimpleLogicComponent.js`.

And see how to put Collector on the logic component to form a service in `src/test-helpers/SimpleLogic/index.js`.

#### Notes

```javascript
    withCollector(LogicCollector)(LogicComponent);
```
provides a special instance function method `this.hset` through extension to the wrapped LogicComponent.

This instance function method should be used to generate the hset props needed to use child services, such as

```javascript
    <Model {...props} hset={this.hset(name)} />
```
where the parameter `name` has the same meaning in `connect(Logic, name)` function.

### Inject service props into consumer component

```javascript
import SimpleLogic from '../test-helpers/SimpleLogic';
import { connect } from './connect';

const NAME = 'Test';
const ServicedComponent = connect(SimpleLogic, NAME)(TargetComponent);
```

### Use injected props

Injected props are just normal props.

## Dependnecy:

react > 16.8.4


## Some basic optional conventions:

### Service and Consumer artefacts naming convention

1. A service component is named as XxxServiceComponent, XxxModelComponent or XxxLogicComponent.
2. A "collected" service component is named as XxxService, XxxModel or XxxLogic.
3. A consumer component may have any React component name.

### Service and Consumer wrapper display names

1. A "collected" service component is named as hCollect(XxxModelComponent).
2. A "connected" service-consumer pair is named as hConnect(hCollect(XxxModelComponent)-TargetComponent).
3. A "injecting" service-consumer pair is named as hInject(hCollect(XxxModelComponent)-TargetComponent).
