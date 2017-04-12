var assert = require('assert');
var eventt = require('../dist/eventt.js');

before(function () {
    this.jsdom = require('jsdom-global')()
})

after(function () {
    this.jsdom()
})

describe('Eventt.js', function() {

    describe('#listen()', function() {

        it('should return one registered event', function() {
            var div = document.createElement('div')
            div.id = '#id'

            var evt = new eventt();
            evt.listen('click', '#id', () => {});
            assert.equal(1, evt.events.length);
        });

    });

});
