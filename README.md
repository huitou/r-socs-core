# r-socs-core

This is an experimental library.

## Scope

SoCs Core is intended to be used to construct "independent" React components called `props source` and collect-inject their functions as props into other React components called `props target`.

This "independent" and "collect-inject" pattern makes Separation of Concern principle practical in React libraries and application development.

All the capacities offered by a React component may be utilised in a `props source`, including its internal state and/or further props injections from another `props source`.

SoCs Core has equivalent capacity of High Order Component constructs. It is a different way to collect and inject logic and/or visual parts into target React components.

## How to

1. install library
2. create your `props source`
3. collect its handles
4. inject handles as props

## Source and Target artefacts naming convention

1. A model component is named as XxxModelComponent or XxxLogicComponent.
2. A "collected" model component is named as XxxModel or XxxLogic.
3. A target component may have any React component name.

## Source and Target wrapper display names

1. A "collected" model component is named as hCollect(XxxModelComponent).
2. A "connected" model-target pair is named as hConnect(hCollect(XxxModelComponent)-TargetComponent).
3. A "injecting" model-target pair is named as hInject(hCollect(XxxModelComponent)-TargetComponent).
