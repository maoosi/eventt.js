# Eventt.js

Tiny event listeners manager.

## Installation

```bash
npm i eventt.js --save
```

## Usage

```javascript
let eventt = new Eventt()


eventt
	.listen('click', '.selector', () => {
	    // callback function
	}, { /* options */ })

eventt
    .listen(['click', 'resize'], ['.selector-1', '#selector-2'], () => {
        // callback function
    })


eventt
    .unlisten('click', '*')

eventt
    .unlisten('*', '.selector')


eventt
    .trigger('click', '#selector-2')

eventt
    .trigger('*', ['.selector-1', '#selector-2'])


eventt
    .list(['.selector-1', '#selector-2'])
```
