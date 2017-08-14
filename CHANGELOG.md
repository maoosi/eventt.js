# Changelog

## v1.1.0

- Ability to group events by UID has been added:
    - `.listen("resize", window, callback, { uid: 'group-id' })`
    - `.trigger("resize", window, 'group-id')`
    - `.unlisten("*", window, 'group-id')`

## v1.0.0

- First release
