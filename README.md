# r-socs-core

This is an experimental library to be published soon.

## What does the library do?

It makes instance methods of a subtree of React components available as injected props to a consumer component.

## Why such a library?

To make separation of concern practical through composition easier than HoC.


## How to use it?

### install the library

npm install --save r-socs-core

### import artefacts of the libary

import {
    Collector,
	withCollector,
	connect
} from 'r-socs-core';

### collect service component

See in `src/test-helpers/SimpleLogic/SimpleLogicCollector.js` how to create a concrete Collector by extending the generic one.

And see in `src/test-helpers/SimpleLogic/SimpleLogicComponent.js` an example of logic component which provides the methods to be collected.

And see in `src/test-helpers/SimpleLogic/index.js` how to put Collector on the logic component to form a service.


### inject service props into consumer component

```import SimpleLogic from '../test-helpers/SimpleLogic';
import { connect } from './connect';

...

const ServicedComponent = connect(SimpleLogic, NAME)(TargetComponent);```


### use injected props

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
