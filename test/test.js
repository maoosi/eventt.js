import { strictEqual } from 'assert'
import Eventt from '../'
import jsdom from 'jsdom-global'

before(() => { jsdom() })
after(() => { jsdom() })

describe('Eventt.js', () => {

    // Instanciate Eventt.js
    const eventt = Eventt({ /* debug: true */ })

    // Create DOM
    let dom = [
        { node: document.createElement('div'), id: 'id' },
        { node: document.createElement('div'), id: 'id2', class: 'selector' },
        { node: document.createElement('div'), class: 'selector' }
    ]
    dom.forEach((el) => {
        document.body.appendChild(el.node)
        if (el.id) el.node.id = el.id
        if (el.class) el.node.classList.add(el.class)
    })
    let elem1 = document.querySelector('#id')
    let elem2 = document.querySelector('#id2')

    // Trigger
    let t = 0

    // basic test
    describe('basic, single listener', () => {

        // listen
        it('listen("click", "#id", () => {}) should add 1 eventListener', () => {
            eventt.listen('click', '#id', () => t++)
            strictEqual(eventt.events.length, 1)
        })

        // trigger
        it('trigger("click", "#id") should trigger 1 eventListener', () => {
            eventt.trigger('click', '#id')
            strictEqual(t, 1)
            t = 0
        })

        // get
        it('get("#id", (events) => {}) should get 1 eventListener', () => {
            eventt.get("#id", (events) => {
                strictEqual(events.length, 1)
            })
        })

        // unlisten
        it('unlisten("click", "#id") should remove 1 eventListener', () => {
            eventt.unlisten('click', '#id')
            strictEqual(eventt.events.length, 0)
        })

    })

    // multiple listeners types
    describe('multiple types of listeners', () => {

        // listen multiple types
        it('listen(["click", "touch"], "#id", () => {}) should add 2 eventListener\'s', () => {
            eventt.listen(['click', 'touch'], '#id', () => t++)
            strictEqual(eventt.events.length, 2)
        })

        // trigger
        it('trigger("*", "#id") should trigger 2 eventListener\'s', () => {
            eventt.trigger('*', '#id')
            strictEqual(t, 2)
            t = 0
        })

        // get
        it('get("*", (events) => {}) should get 2 eventListener', () => {
            eventt.get("*", (events) => {
                strictEqual(events.length, 2)
            })
        })

        // unlisten
        it('unlisten("*", "#id") should remove 2 eventListener\'s', () => {
            eventt.unlisten('*', '#id')
            strictEqual(eventt.events.length, 0)
        })

    })

    // parallel selectors
    describe('parallel selectors for listeners', () => {

        // listen
        it('listen("click", [".selector"], () => {}) should add 2 eventListener\'s', () => {
            eventt.listen("click", [".selector"], () => t++)
            strictEqual(eventt.events.length, 2)
        })

        // listen again
        it('listen("click", [".selector"], () => {}) should add 2 additional eventListener\'s', () => {
            eventt.listen("click", [".selector"], () => t++)
            strictEqual(eventt.events.length, 4)
        })

        // trigger
        it('trigger("*", "#id2") should trigger 2 eventListener\'s', () => {
            eventt.trigger('*', "#id2")
            strictEqual(t, 2)
            t = 0
        })

        // get
        it('get("*", (events) => {}) should get 4 eventListener', () => {
            eventt.get("*", (events) => {
                strictEqual(events.length, 4)
            })
        })

        // get
        it('get("#id2", (events) => {}) should get 2 eventListener', () => {
            eventt.get("#id2", (events) => {
                strictEqual(events.length, 2)
            })
        })

        // unlisten
        it('unlisten("click", "#id2") should remove 2 eventListener\'s', () => {
            eventt.unlisten('click', '#id2')
            strictEqual(eventt.events.length, 2)
        })

        // unlisten
        it('unlisten("*") should remove 2 eventListener\'s', () => {
            eventt.unlisten('*')
            strictEqual(eventt.events.length, 0)
        })

    })

    // advanced tests with multiple nodes
    describe('advanced, multiple nodes', () => {

        // listen
        it('listen("click", ["#id", ".selector"], () => {}) should add 3 eventListener\'s', () => {
            eventt.listen('click', ['#id', '.selector'], () => t++)
            strictEqual(eventt.events.length, 3)
        })

        // trigger
        it('trigger("click", "*") should trigger 3 eventListener\'s', () => {
            eventt.trigger('click', '*')
            strictEqual(t, 3)
            t = 0
        })

        // trigger
        it('trigger("click", ["#id", "#id2"]) should trigger 2 eventListener\'s', () => {
            eventt.trigger('click', ["#id", "#id2"])
            strictEqual(t, 2)
            t = 0
        })

        // trigger
        it('trigger("click", "#id") should trigger 1 eventListener', () => {
            eventt.trigger('click', '#id')
            strictEqual(t, 1)
            t = 0
        })

        // trigger
        it('trigger("touch", "#id") should trigger 0 eventListener\'s', () => {
            eventt.trigger('touch', '#id')
            strictEqual(t, 0)
            t = 0
        })

        // get
        it('get(["#id", "#id2"], (events) => {}) should get 2 eventListener', () => {
            eventt.get(["#id", "#id2"], (events) => {
                strictEqual(events.length, 2)
            })
        })

        // get
        it('get("#id", (events) => {}) should get 1 eventListener', () => {
            eventt.get("#id", (events) => {
                strictEqual(events.length, 1)
            })
        })

        // get
        it('get(".selector", (events) => {}) should get 2 eventListener', () => {
            eventt.get(".selector", (events) => {
                strictEqual(events.length, 2)
            })
        })

        // get
        it('get("*", (events) => {}) should get 3 eventListener', () => {
            eventt.get("*", (events) => {
                strictEqual(events.length, 3)
            })
        })

        // get
        it('get(".no-existing", (events) => {}) should get 0 eventListener', () => {
            eventt.get(".no-existing", (events) => {
                strictEqual(events.length, 0)
            })
        })

        // unlisten
        it('unlisten("*", "#id") should remove 1 eventListener', () => {
            eventt.unlisten('*', '#id')
            strictEqual(eventt.events.length, 2)
        })

        // unlisten
        it('unlisten("*") should remove all eventListener\'s', () => {
            eventt.unlisten('*')
            strictEqual(eventt.events.length, 0)
        })

        // listen
        it('listen("click", [elem1, elem2], () => {}) should add 2 eventListener\'s', () => {
            eventt.listen('click', [elem1, elem2], () => t++)
            strictEqual(eventt.events.length, 2)
        })

        // trigger
        it('trigger("click", elem1) should trigger 1 eventListener\'s', () => {
            eventt.trigger('click', elem1)
            strictEqual(t, 1)
            t = 0
        })

        // unlisten
        it('unlisten("*") should remove all eventListener\'s', () => {
            eventt.unlisten('*')
            strictEqual(eventt.events.length, 0)
        })

    })
})
