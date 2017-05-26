class Eventt {

    /**
        --- CORE ---
    **/

    constructor (options = {}) {
    // instance constructor
        this.options = {
            debug: options.debug || false
        }

        this.debug = this.options.debug
        this.events = []

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
                    document.querySelectorAll(_selector) : this._toArray(_selector)

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

                        this._debug('info', `Add eventListener ${ _type } on ${ _target.outerHTML }.`)

                    })
                })
            })
        } else {
            this._debug('error', 'Wrong parameters for the `listen()` method.')
        }

        return this
    }

    unlisten (type, selector = '*') {
    // remove events listeners
        if (type !== undefined) {
            let types = this._toArray(type)
            let selectors = this._toArray(selector)
            let removables = []

            this.events.forEach((_event) => {
                let isTarget = this._isTarget(_event.targetElem, selectors)
                let isType = this._isType(_event.eventType, types)

                if (isTarget && isType) {
                    removables.push(_event)
                    this._removeEvent(_event)
                    this._debug('info', `Remove eventListener ${ _event.eventType } on ${ _event.targetElem.outerHTML }.`)
                }
            })

            this.events = this.events.filter(event => !removables.includes(event))
        } else {
            this._debug('error', 'Wrong parameters for the `unlisten()` method.')
        }

        return this
    }

    trigger (type, selector = '*') {
    // trigger events listeners
        if (type !== undefined && selector !== undefined) {
            let types = this._toArray(type)
            let selectors = this._toArray(selector)

            this.events.forEach((_event) => {
                let isTarget = this._isTarget(_event.targetElem, selectors)
                let isType = this._isType(_event.eventType, types)

                if (isTarget && isType) {
                    this._triggerEvent(_event)
                    this._debug('info', `Trigger eventListener ${ _event.eventType } on ${ _event.targetElem.outerHTML }.`)
                }
            })
        } else {
            this._debug('error', 'Wrong parameters for the `trigger()` method.')
        }

        return this
    }

    get (selector, callback) {
    // get events listeners
        if (selector !== undefined && callback !== undefined) {
            let selectors = this._toArray(selector)
            let eventsList = []

            this.events.forEach((_event) => {
                let isTarget = this._isTarget(_event.targetElem, selectors)

                if (isTarget) {
                    eventsList.push(_event)
                    this._debug('info', `Get eventListener ${ _event.eventType } on ${ _event.targetElem.outerHTML }.`)
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

    _addEvent (event) {
    // add event listener
        event.targetElem.addEventListener(event.eventType, event.func, event.opts || false)
    }

    _removeEvent (event) {
    // remove event listener
        event.targetElem.removeEventListener(event.eventType, event.func, event.opts || false)
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
                document.querySelectorAll(selector) : this._toArray(selector)

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

    _debug (type, message) {
    // log errors
        if (this.debug) {
            /* eslint-disable no-console */
            console.debug(`> Eventt.js | ${ type } :: ${ message }`)
        }
    }

}

export default (...args) => { return new Eventt(...args) }
