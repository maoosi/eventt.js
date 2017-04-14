# Eventt.js

Tiny 1.2Kb event listeners manager.


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
    .get('.selector')
```


## Contribute

```bash
npm run watch
npm run test
```
