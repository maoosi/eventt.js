export default class Eventt {

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

    listen (type, selector, func, opts = false) {
    // add events listeners
        if (type !== undefined && selector !== undefined && typeof func === 'function') {
            let types = this._toArray(type)
            let selectors = this._toArray(selector)

            selectors.forEach((_selector) => {
                let targets = document.querySelectorAll(_selector)

                targets.forEach((_target) => {
                    types.forEach((_type) => {

                        this._addEvent({
                            targetElem: _target,
                            eventType: _type,
                            func: func,
                            opts: opts
                        })

                    })
                })
            })
        } else {
            this._debug('error', 'Wrong parameters for the `listen()` method.')
        }

        return this
    }

    unlisten (type, selector) {
    // remove events listeners
        if (type !== undefined && selector !== undefined) {
            let types = this._toArray(type)
            let selectors = this._toArray(selector)

            selectors.forEach((_selector) => {
                let targets = document.querySelectorAll(_selector)

                targets.forEach((_target) => {
                    types.forEach((_type) => {

                        this.events.forEach((_event, _index) => {
                            let isTarget = _event.targetElem === _target || _target === '*'
                            let isType = _event.eventType === _type || _type === '*'

                            if (isTarget && isType) {
                                this._removeEvent(_event, _index)
                            }
                        })

                    })
                })
            })
        } else {
            this._debug('error', 'Wrong parameters for the `unlisten()` method.')
        }

        return this
    }

    trigger (type, selector) {
    // trigger events listeners
        if (type !== undefined && selector !== undefined) {
            let types = this._toArray(type)
            let selectors = this._toArray(selector)

            selectors.forEach((_selector) => {
                let targets = document.querySelectorAll(_selector)

                targets.forEach((_target) => {
                    types.forEach((_type) => {

                        this.events.forEach((_event) => {
                            let isTarget = _event.targetElem === _target || _target === '*'
                            let isType = _event.eventType === _type || _type === '*'

                            if (isTarget && isType) {
                                this._triggerEvent(_event)
                            }
                        })

                    })
                })
            })
        } else {
            this._debug('error', 'Wrong parameters for the `trigger()` method.')
        }

        return this
    }

    /**
        --- FUNCTIONS ---
    **/

    _addEvent (event) {
    // add event listener
        this.events.push(event)
        return event.targetElem.addEventListener(event.eventType, event.func, event.opts || false)
    }

    _removeEvent (event, index) {
    // remove event listener
        this.events.splice(index, 1)
        return event.targetElem.removeEventListener(event.eventType, event.func, event.opts || false)
    }

    _triggerEvent (event) {
    // trigger event
        return event.func.call(this)
    }

    _toArray (data) {
    // convert the data passed to an array
        return typeof data === 'string' ? [data] : data
    }

    _debug (type, message) {
    // log errors
        if (this.debug) {
            console.log('> Eventt.js | ' + type + ' :: ' + message + ' Please refer to the doc: `https://github.com/maoosi/eventt.js`')
        }
    }

}
