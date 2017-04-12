!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):e.eventt=t()}(this,function(){"use strict";var e=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},t=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),n=function(){function n(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return e(this,n),this.options={debug:t.debug||!1},this.debug=this.options.debug,this.events=[],this}return t(n,[{key:"listen",value:function(e,t,n){var r=this,o=arguments.length>3&&void 0!==arguments[3]&&arguments[3];if(void 0!==e&&void 0!==t&&"function"==typeof n){var i=this._toArray(e),u=this._toArray(t);u.forEach(function(e){var t=document.querySelectorAll(e);t.forEach(function(e){i.forEach(function(t){r._addEvent({targetElem:e,eventType:t,func:n,opts:o})})})})}else this._debug("error","Wrong parameters for the `listen()` method.");return this}},{key:"unlisten",value:function(e,t){var n=this;if(void 0!==e&&void 0!==t){var r=this._toArray(e),o=this._toArray(t);o.forEach(function(e){var t=document.querySelectorAll(e);t.forEach(function(e){r.forEach(function(t){n.events.forEach(function(r,o){var i=r.targetElem===e||"*"===e,u=r.eventType===t||"*"===t;i&&u&&n._removeEvent(r,o)})})})})}else this._debug("error","Wrong parameters for the `unlisten()` method.");return this}},{key:"trigger",value:function(e,t){var n=this;if(void 0!==e&&void 0!==t){var r=this._toArray(e),o=this._toArray(t);o.forEach(function(e){var t=document.querySelectorAll(e);t.forEach(function(e){r.forEach(function(t){n.events.forEach(function(r){var o=r.targetElem===e||"*"===e,i=r.eventType===t||"*"===t;o&&i&&n._triggerEvent(r)})})})})}else this._debug("error","Wrong parameters for the `trigger()` method.");return this}},{key:"_addEvent",value:function(e){return this.events.push(e),e.targetElem.addEventListener(e.eventType,e.func,e.opts||!1)}},{key:"_removeEvent",value:function(e,t){return this.events.splice(t,1),e.targetElem.removeEventListener(e.eventType,e.func,e.opts||!1)}},{key:"_triggerEvent",value:function(e){return e.func.call(this)}},{key:"_toArray",value:function(e){return"string"==typeof e?[e]:e}},{key:"_debug",value:function(e,t){this.debug}}]),n}();return n});
//# sourceMappingURL=eventt.js.map
