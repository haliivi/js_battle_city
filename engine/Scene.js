;(function () {
    'use strict'

    class Scene {
        constructor (args = {}) {
            const {
                autoStart=true,
                loading,
                init,
                update} = args
            this.autoStart = autoStart
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