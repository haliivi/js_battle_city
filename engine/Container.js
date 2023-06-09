;(function () {
    'use strict'
    class Container {
        constructor () {
            this.displayObjects = []
        }

        add (displayObject) {
            if (!this.displayObjects.includes(displayObject)) {
                this.displayObjects.push(displayObject)
            }
        }

        remove () {}
    }

    window.GameEngine = window.GameEngine || {};
    window.GameEngine.Sprite = Sprite;
})();