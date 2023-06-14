;(function () {
    'use strict'

    class Scene extends GameEngine.Container {
        constructor (args = {}) {
            super()
            const {
                autoStart=true,
                loading,
                init,
                update} = args
            this.autoStart = autoStart
            this.status = 'waiting'
            this.stage = this.displayObjects
            this.game = null
            this.loading = loading.bind(this)
            this.init = init.bind(this)
            this.update = update.bind(this)
        }

        loading () {}

        init () {}

        update () {}
    }

    window.GameEngine = window.GameEngine || {};
    window.GameEngine.Scene = Scene;
})();