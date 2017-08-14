import './polyfills'

class Eventt {

    /**
        --- CORE ---
    **/

    constructor (options = {}) {
    // instance constructor
        this.options = {
            intercept: options.intercept || false,
            debug: options.debug || false
        }

        this.debug = this.options.debug
        this.events = []

        if (this.options.intercept) this._interceptNative()

        return this
    }

    /**
        --- API ---
    **/

    listen (type, selector, func, opts = null) {
    // add events listeners
        if (type !== undefined && selector !== undefined && typeof func === 'function') {
            let types = this._toArray(type)
            let selectors = this._toArray(selector)
            let options = null

            if (typeof opts === 'boolean') options = { capture: opts }
            else if (typeof opts === 'object') options = opts

            selectors.forEach((_selector) => {
                let targets = typeof _selector === 'string' ?
                    this._objToArray(document.querySelectorAll(_selector)) : this._toArray(_selector)

                targets.forEach((_target) => {
                    types.forEach((_type) => {

                        let event = {
                            targetElem: _target,
                            eventType: _type,
                            func: func,
                            opts: options
                        }

                        this._addEvent(event)
                        this.events.push(event)

                        this._debug('info', `Add eventListener ${ _type } on ${ this._whichElement(_target) }.`)

                    })
                })
            })
        } else {
            this._debug('error', 'Wrong parameters for the `listen()` method.')
        }

        return this
    }

    unlisten (type, selector = '*', uid = null) {
    // remove events listeners
        if (type !== undefined) {
            let types = this._toArray(type)
            let selectors = this._toArray(selector)
            let removables = []

            this.events.forEach((_event) => {
                let isTarget = this._isTarget(_event.targetElem, selectors)
                let isType = this._isType(_event.eventType, types)
                let isTargetUid = (uid === null) || (_event.opts !== null && _event.opts['uid'] != undefined && _event.opts.uid === uid)

                if (isTarget && isType && isTargetUid) {
                    removables.push(_event)
                    this._removeEvent(_event)
                    this._debug('info', `Remove eventListener ${ _event.eventType } on ${ this._whichElement(_event.targetElem) }.`)
                }
            })

            this.events = this.events.filter(event => !removables.includes(event))
        } else {
            this._debug('error', 'Wrong parameters for the `unlisten()` method.')
        }

        return this
    }

    trigger (type, selector = '*', uid = null) {
    // trigger events listeners
        if (type !== undefined && selector !== undefined) {
            let types = this._toArray(type)
            let selectors = this._toArray(selector)

            this.events.forEach((_event) => {
                let isTarget = this._isTarget(_event.targetElem, selectors)
                let isType = this._isType(_event.eventType, types)
                let isTargetUid = (uid === null) || (_event.opts !== null && _event.opts['uid'] != undefined && _event.opts.uid === uid)

                if (isTarget && isType && isTargetUid) {
                    this._triggerEvent(_event)
                    this._debug('info', `Trigger eventListener ${ _event.eventType } on ${ this._whichElement(_event.targetElem) }.`)
                }
            })
        } else {
            this._debug('error', 'Wrong parameters for the `trigger()` method.')
        }

        return this
    }

    list (selector, callback) {
    // list events listeners
        if (selector !== undefined && callback !== undefined) {
            let selectors = this._toArray(selector)
            let eventsList = []

            this.events.forEach((_event) => {
                let isTarget = this._isTarget(_event.targetElem, selectors)

                if (isTarget) {
                    eventsList.push(_event)
                    this._debug('info', `List eventListener ${ _event.eventType } on ${ this._whichElement(_event.targetElem) }.`)
                }
            })

            callback.call(this, eventsList)
        } else {
            this._debug('error', 'Wrong parameters for the `get()` method.')
        }

        return this
    }

    /**
        --- FUNCTIONS ---
    **/

    _interceptNative () {
        let _addEventt = (target, type, func, options) => {
            this._debug('info', `Native addEventListener ${ type } intercepted on ${ this._whichElement(target) }.`)
            this.listen(type, target, func, options)
        }
        let _removeEventt = (target, type) => {
            this._debug('info', `Native removeEventListener ${ type } intercepted on ${ this._whichElement(target) }.`)
            this.unlisten(type, target)
        }

        if (typeof Element !== 'undefined') {
            let e_addEventL = Element.prototype.addEventListener
            Element.prototype.addEventListener = function(type, func, options) {
                if (typeof options !== 'undefined' && typeof options.eventt !== 'undefined')
                    e_addEventL.call(this, type, func, options)
                else
                    _addEventt(this, type, func, options)
            }
            let e_removeEventL = Element.prototype.removeEventListener
            Element.prototype.removeEventListener = function(type, func, options) {
                if (typeof options !== 'undefined' && typeof options.eventt !== 'undefined')
                    e_removeEventL.call(this, type, func, options)
                else
                    _removeEventt(this, type)
            }
        }

        if (typeof Window !== 'undefined') {
            let w_addEventL = Window.prototype.addEventListener
            Window.prototype.addEventListener = function(type, func, options) {
                if (typeof options !== 'undefined' && typeof options.eventt !== 'undefined')
                    w_addEventL.call(this, type, func, options)
                else
                    _addEventt(this, type, func, options)
            }
            let w_removeEventL = Window.prototype.removeEventListener
            Window.prototype.removeEventListener = function(type, func, options) {
                if (typeof options !== 'undefined' && typeof options.eventt !== 'undefined')
                    w_removeEventL.call(this, type, func, options)
                else
                    _removeEventt(this, type)
            }
        }

        if (typeof Document !== 'undefined') {
            let d_addEventL = Document.prototype.addEventListener
            Document.prototype.addEventListener = function(type, func, options) {
                if (typeof options !== 'undefined' && typeof options.eventt !== 'undefined')
                    d_addEventL.call(this, type, func, options)
                else
                    _addEventt(this, type, func, options)
            }
            let d_removeEventL = Document.prototype.removeEventListener
            Document.prototype.removeEventListener = function(type, func, options) {
                if (typeof options !== 'undefined' && typeof options.eventt !== 'undefined')
                    d_removeEventL.call(this, type, func, options)
                else
                    _removeEventt(this, type)
            }
        }
    }

    _addEvent (event) {
    // add event listener
        event.targetElem.addEventListener(event.eventType, event.func, this._transformOptions(event.opts))
    }

    _removeEvent (event) {
    // remove event listener
        event.targetElem.removeEventListener(event.eventType, event.func, this._transformOptions(event.opts))
    }

    _transformOptions (options) {
    // filter options
        let _options = (typeof options === 'boolean') ? { capture: options } : (options || {})
        return Object.assign({ eventt: true }, _options)
    }

    _whichElement (target) {
    // return element info
        return (typeof target.outerHTML !== 'undefined') ? target.outerHTML : String(target)
    }

    _triggerEvent (event) {
    // trigger event
        event.func.call(this)
    }

    _isTarget(target, selectors) {
    // return true if target is part of selectors
        if (selectors[0] === '*') return true
        let found = false

        selectors.forEach((selector) => {
            let targets = typeof selector === 'string' ?
                this._objToArray(document.querySelectorAll(selector)) : this._toArray(selector)

            targets.forEach((el) => {
                if (el === target) found = true
            })
        })

        return found
    }

    _isType(type, types) {
    // return true if type is part of types
        return types[0] === '*' || types.includes(type)
    }

    _toArray (data) {
    // convert the data passed to an array
        return Array.isArray(data) ? data : [data]
    }

    _objToArray (obj) {
    // convert the obj passed into an array
        return Object.keys(obj).map(key => obj[key])
    }

    _debug (type, message) {
    // log errors
        if (this.debug) {
            /* eslint-disable no-console */
            console.debug(`> Eventt.js | ${ type } :: ${ message }`)
        }
    }

}

export default (...args) => { return new Eventt(...args) }
