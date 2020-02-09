# r-socs-core

This is an experimental library to be published soon.

## What does the library do?

It makes instance methods of a React component available as injected props to another component.

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

### wepper React component

...

### inject props to target component

...


### use injected props normally



## Dependnecy:

to be done.


## Some basic optional conventions:

### Logic and Target artefacts naming convention

1. A model component is named as XxxModelComponent or XxxLogicComponent.
2. A "collected" model component is named as XxxModel or XxxLogic.
3. A target component may have any React component name.

### Logic and Target wrapper display names

1. A "collected" model component is named as hCollect(XxxModelComponent).
2. A "connected" model-target pair is named as hConnect(hCollect(XxxModelComponent)-TargetComponent).
3. A "injecting" model-target pair is named as hInject(hCollect(XxxModelComponent)-TargetComponent).
