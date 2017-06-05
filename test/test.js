import { strictEqual } from 'assert'
import Eventt from '../'
import jsdom from 'jsdom-global'

before(() => { jsdom() })
after(() => { jsdom() })

describe('Eventt.js', () => {

    // Instanciate Eventt.js
    const eventt = Eventt({ intercept: true })

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

        // list
        it('list("#id", (events) => {}) should list 1 eventListener', () => {
            eventt.list("#id", (events) => {
                strictEqual(events.length, 1)
            })
        })

        // unlisten
        it('unlisten("click", "#id") should remove 1 eventListener', () => {
            eventt.unlisten('click', '#id')
            strictEqual(eventt.events.length, 0)
        })

    })

    // basic test
    describe('window element listener', () => {

        // listen
        it('listen("resize", window, () => {}) should add 1 eventListener', () => {
            eventt.listen('resize', window, () => t++)
            strictEqual(eventt.events.length, 1)
        })

        // trigger
        it('trigger("resize", window) should trigger 1 eventListener', () => {
            eventt.trigger('resize', window)
            strictEqual(t, 1)
            t = 0
        })

        // list
        it('list(window, (events) => {}) should list 1 eventListener', () => {
            eventt.list(window, (events) => {
                strictEqual(events.length, 1)
            })
        })

        // unlisten
        it('unlisten("resize", window) should remove 1 eventListener', () => {
            eventt.unlisten('resize', window)
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

        // list
        it('list("*", (events) => {}) should list 2 eventListener', () => {
            eventt.list("*", (events) => {
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

        // list
        it('list("*", (events) => {}) should list 4 eventListener', () => {
            eventt.list("*", (events) => {
                strictEqual(events.length, 4)
            })
        })

        // list
        it('list("#id2", (events) => {}) should list 2 eventListener', () => {
            eventt.list("#id2", (events) => {
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
    describe('advanced multiple nodes', () => {

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

        // list
        it('list(["#id", "#id2"], (events) => {}) should list 2 eventListener', () => {
            eventt.list(["#id", "#id2"], (events) => {
                strictEqual(events.length, 2)
            })
        })

        // list
        it('list("#id", (events) => {}) should list 1 eventListener', () => {
            eventt.list("#id", (events) => {
                strictEqual(events.length, 1)
            })
        })

        // list
        it('list(".selector", (events) => {}) should list 2 eventListener', () => {
            eventt.list(".selector", (events) => {
                strictEqual(events.length, 2)
            })
        })

        // list
        it('list("*", (events) => {}) should list 3 eventListener', () => {
            eventt.list("*", (events) => {
                strictEqual(events.length, 3)
            })
        })

        // list
        it('list(".no-existing", (events) => {}) should list 0 eventListener', () => {
            eventt.list(".no-existing", (events) => {
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

    // basic test
    describe('intercept native addEventListener', () => {

        // intercept
        it('addEventListener() should intercept 1 eventListener', () => {
            document.addEventListener('resize', () => t++)
            strictEqual(eventt.events.length, 1)
        })

        // trigger
        it('trigger("resize", document) should trigger 1 eventListener', () => {
            eventt.trigger('resize', document)
            strictEqual(t, 1)
            t = 0
        })

        // list
        it('list(document, (events) => {}) should list 1 eventListener', () => {
            eventt.list(document, (events) => {
                strictEqual(events.length, 1)
            })
        })

        // unlisten
        it('unlisten("resize", document) should remove 1 eventListener', () => {
            eventt.unlisten('resize', document)
            strictEqual(eventt.events.length, 0)
        })

    })
})
