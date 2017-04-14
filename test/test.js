import { strictEqual } from 'assert'
import Eventt from '../'
import jsdom from 'jsdom-global'

before(() => { jsdom() })
after(() => { jsdom() })

describe('Eventt.js', () => {

    // Instanciate Eventt.js
    let eventt = new Eventt({ /* debug: true */ })

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

    // Trigger
    let t = 0

    describe('basic, single listener', () => {
        it('listen("click", "#id", () => {}) should add 1 eventListener', () => {
            eventt.listen('click', '#id', () => t++)
            strictEqual(eventt.events.length, 1)
        })

        it('trigger("click", "#id") should trigger 1 eventListener', () => {
            eventt.trigger('click', '#id')
            strictEqual(t, 1)
            t = 0
        })

        it('unlisten("click", "#id") should remove 1 eventListener', () => {
            eventt.unlisten('click', '#id')
            strictEqual(eventt.events.length, 0)
        })
    })

    describe('multiple types of listeners', () => {
        it('listen(["click", "touch"], "#id", () => {}) should add 2 eventListener\'s', () => {
            eventt.listen(['click', 'touch'], '#id', () => t++)
            strictEqual(eventt.events.length, 2)
        })

        it('trigger("*", "#id") should trigger 2 eventListener\'s', () => {
            eventt.trigger('*', '#id')
            strictEqual(t, 2)
            t = 0
        })

        it('unlisten("*", "#id") should remove 2 eventListener\'s', () => {
            eventt.unlisten('*', '#id')
            strictEqual(eventt.events.length, 0)
        })
    })

    describe('advanced, multiple nodes', () => {
        it('listen("click", ["#id", ".selector"], () => {}) should add 3 eventListener\'s', () => {
            eventt.listen('click', ['#id', '.selector'], () => t++)
            strictEqual(eventt.events.length, 3)
        })

        it('trigger("click", "*") should trigger 3 eventListener\'s', () => {
            eventt.trigger('click', '*')
            strictEqual(t, 3)
            t = 0
        })

        it('trigger("click", ["#id", "#id2"]) should trigger 2 eventListener\'s', () => {
            eventt.trigger('click', ["#id", "#id2"])
            strictEqual(t, 2)
            t = 0
        })

        it('trigger("click", "#id") should trigger 1 eventListener', () => {
            eventt.trigger('click', '#id')
            strictEqual(t, 1)
            t = 0
        })

        it('trigger("touch", "#id") should trigger 0 eventListener\'s', () => {
            eventt.trigger('touch', '#id')
            strictEqual(t, 0)
            t = 0
        })

        it('unlisten("*", "#id") should remove 1 eventListener', () => {
            eventt.unlisten('*', '#id')
            strictEqual(eventt.events.length, 2)
        })

        it('unlisten("*") should remove all eventListener\'s', () => {
            eventt.unlisten('*')
            strictEqual(eventt.events.length, 0)
        })
    })

    describe('errors', () => {})
})
