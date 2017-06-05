# Eventt.js

🛎️ Tiny 2.1Kb event listeners manager.

[![Gemnasium](https://img.shields.io/gemnasium/maoosi/eventt.js.svg)](https://github.com/maoosi/eventt.js) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/maoosi/eventt.js/master/LICENSE.md) [![GitHub release](https://img.shields.io/github/release/maoosi/eventt.js.svg)](https://github.com/maoosi/eventt.js) [![GitHub issues](https://img.shields.io/github/issues/maoosi/eventt.js.svg)](https://github.com/maoosi/eventt.js/issues)


## Installation

### Using NPM

```bash
npm i eventt.js --save
```

### Unpkg CDN

```html
<script src="https://unpkg.com/eventt.js@1.0.0/dist/eventt.js"></script>
```


## Usage

```javascript
import Eventt from 'eventt.js'

// create events instance/group
const eventt = Eventt()

// addEventListener
eventt.listen("click", "#id", () => { /* callback */ })
eventt.listen("resize", window, () => { /* callback */ })
eventt.listen(["click", "resize"], ["#id", ".selector"], () => { /* callback */ }, { /* opts */ })

// getEventListeners
eventt.list(".selector", (events) => { /* first argument = events array */ })

// dispatchEvent
eventt.trigger("click", "*")
eventt.trigger("*", ["#id", ".selector"])

// removeEventListener
eventt.unlisten("click", "*")
eventt.unlisten("*", ".selector")
```


## Options

It is possible to pass different options to the `Event({ /* options here */ })` instance:

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `intercept` | *boolean* | `false` | If set to `true`, all the native `.addEventListener()` and `.removeEventListener()` calls will be intercepted and transformed into `.listen()` and `.unlisten()`. This can be particularly useful in case you want to implement Eventt.js into an already existing project, without having to update your existing code. |
| `debug` | *boolean* | `false` | If set to `true`, every action performed will output debugging information into the `console`. |


## Browser Support

Fully supported by Evergreen Browsers (Edge, Opera, Safari, Firefox & Chrome) and IE 10+ browsers.

> For **older browsers support like IE9**, you may need to include the following Polyfill library on your site:
>
```html
<script src="https://cdn.polyfill.io/v2/polyfill.min.js"></script>
```


## Contribution

```bash
npm run watch
npm run test
```


## License

[MIT](https://github.com/maoosi/eventt.js/blob/master/LICENSE.md) © 2017 Sylvain Simao
