;(function () {
    'use strict'

    class Scene extends GameEngine.Container {
        constructor (args = {}) {
            super()
            const {
                autoStart=true,
                loading,
                init,
                update,
                name='mainScene',
            } = args
            this.autoStart = autoStart
            this.name = name
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

        beforeDestroy () {
            for (const key of Object.keys(this)) {
                delete this[key]
            }
        }
    }

    window.GameEngine = window.GameEngine || {};
    window.GameEngine.Scene = Scene;
})();