(function () {
    'use strict';

    class Scene {
        constructor({
            autoStart = true,
            loading = () => {console.log(this)},
            init = () => {},
            update = () => {},
        }) {
            this.autoStart = autoStart;
            this.loading = loading.bind(this);
            this.init = init;
            this.update = update
            console.log('Scene');
        }
    }

    window.GameEngine = window.GameEngine || {};
    window.GameEngine.Scene = Scene;
})();
