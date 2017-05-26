/*!
* eventt.js 1.0.0 - Tiny 1.2Kb event listeners manager.
*
* @author       maoosi <hello@sylvainsimao.fr>
* @homepage     https://github.com/maoosi/eventt.js#readme
* @copyright    Copyright (c) 2017 maoosi <hello@sylvainsimao.fr>
* @license      MIT
* @version      1.0.0
*/
var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},classCallCheck=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},createClass=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),Eventt=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return classCallCheck(this,e),this.options={debug:t.debug||!1},this.debug=this.options.debug,this.events=[],this}return createClass(e,[{key:"listen",value:function(e,t,n){var r=this,o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null;if(void 0!==e&&void 0!==t&&"function"==typeof n){var i=this._toArray(e),u=this._toArray(t),a=null;"boolean"==typeof o?a={capture:o}:"object"===("undefined"==typeof o?"undefined":_typeof(o))&&(a=o),u.forEach(function(e){var t="string"==typeof e?document.querySelectorAll(e):r._toArray(e);t.forEach(function(e){i.forEach(function(t){var o={targetElem:e,eventType:t,func:n,opts:a};r._addEvent(o),r.events.push(o),r._debug("info","Add eventListener "+t+" on "+e.outerHTML+".")})})})}else this._debug("error","Wrong parameters for the `listen()` method.");return this}},{key:"unlisten",value:function(e){var t=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"*";if(void 0!==e){var r=this._toArray(e),o=this._toArray(n),i=[];this.events.forEach(function(e){var n=t._isTarget(e.targetElem,o),u=t._isType(e.eventType,r);n&&u&&(i.push(e),t._removeEvent(e),t._debug("info","Remove eventListener "+e.eventType+" on "+e.targetElem.outerHTML+"."))}),this.events=this.events.filter(function(e){return!i.includes(e)})}else this._debug("error","Wrong parameters for the `unlisten()` method.");return this}},{key:"trigger",value:function(e){var t=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"*";if(void 0!==e&&void 0!==n){var r=this._toArray(e),o=this._toArray(n);this.events.forEach(function(e){var n=t._isTarget(e.targetElem,o),i=t._isType(e.eventType,r);n&&i&&(t._triggerEvent(e),t._debug("info","Trigger eventListener "+e.eventType+" on "+e.targetElem.outerHTML+"."))})}else this._debug("error","Wrong parameters for the `trigger()` method.");return this}},{key:"list",value:function(e,t){var n=this;if(void 0!==e&&void 0!==t){var r=this._toArray(e),o=[];this.events.forEach(function(e){var t=n._isTarget(e.targetElem,r);t&&(o.push(e),n._debug("info","Get eventListener "+e.eventType+" on "+e.targetElem.outerHTML+"."))}),t.call(this,o)}else this._debug("error","Wrong parameters for the `get()` method.");return this}},{key:"_addEvent",value:function(e){e.targetElem.addEventListener(e.eventType,e.func,e.opts||!1)}},{key:"_removeEvent",value:function(e){e.targetElem.removeEventListener(e.eventType,e.func,e.opts||!1)}},{key:"_triggerEvent",value:function(e){e.func.call(this)}},{key:"_isTarget",value:function(e,t){var n=this;if("*"===t[0])return!0;var r=!1;return t.forEach(function(t){var o="string"==typeof t?document.querySelectorAll(t):n._toArray(t);o.forEach(function(t){t===e&&(r=!0)})}),r}},{key:"_isType",value:function(e,t){return"*"===t[0]||t.includes(e)}},{key:"_toArray",value:function(e){return Array.isArray(e)?e:[e]}},{key:"_debug",value:function(e,t){this.debug&&console.debug("> Eventt.js | "+e+" :: "+t)}}]),e}(),eventt=function(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];return new(Function.prototype.bind.apply(Eventt,[null].concat(t)))};export default eventt;
//# sourceMappingURL=eventt.mjs.map
