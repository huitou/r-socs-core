# r-socs-core

This is an experimental library.

## Logic and Target artefacts naming convention

1. A model component is named as XxxModelComponent or XxxLogicComponent.
2. A "collected" model component is named as XxxModel or XxxLogic.
3. A target component may have any React component name.

## Logic and Target wrapper display names

1. A "collected" model component is named as hCollect(XxxModelComponent).
2. A "connected" model-target pair is named as hConnect(hCollect(XxxModelComponent)-TargetComponent).
3. A "injecting" model-target pair is named as hInject(hCollect(XxxModelComponent)-TargetComponent).
