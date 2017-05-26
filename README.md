# Eventt.js

🛎️ Tiny 1.4Kb event listeners manager.

[![Gemnasium](https://img.shields.io/gemnasium/maoosi/eventt.js.svg)](https://github.com/maoosi/eventt.js) [![GitHub release](https://img.shields.io/github/release/maoosi/eventt.js.svg)](https://github.com/maoosi/eventt.js)  [![label](https://img.shields.io/github/issues-raw/badges/maoosi/eventt.js.svg)](https://github.com/maoosi/eventt.js)


## Roadmap v1.0.0

- [ ] Dispatch browser events instead of function execution <sup>1</sup> <sub><sup>https://stackoverflow.com/questions/2490825/how-to-trigger-event-in-javascript</sup></sub>
- [ ] Catch all browser events <sup>2</sup> <sub><sup>http://stackoverflow.com/questions/9046741/get-event-listeners-attached-to-node-using-addeventlistener</sup></sub>
- [ ] Create demo file for cross-browsers testing
- [ ] Travis CI implementation


## Installation

**⚠️ Dev in progress. v1.0.0 release coming soon.**

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

// create events instance/group, optional debug setting
const eventt = Eventt({ /* debug: true */ })

// addEventListener
eventt.listen("click", "#id", () => { /* callback */ })
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


## Browser Support

**⚠️ Google Chrome Ready! Cross-browsers testing in progress.**

Fully supported by Evergreen Browsers (Edge, Opera, Safari, Firefox & Chrome) and IE 10+ browsers.

> For **older browsers support like IE9**, you'll need to include the following Polyfill library on your site:
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
