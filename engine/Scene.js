(function () {
    'use strict';

    class Scene extends GameEngine.Container {
        constructor({
            autoStart = true,
            loading = () => {},
            init = () => {},
            update = () => {},
        }) {
            super();
            this.stage = this.displayObjects;
            this.status = 'waiting';
            this.game = null;
            this.autoStart = autoStart;
            this.loading = loading;
            this.init = init;
            this.update = update;
        }
    }

    window.GameEngine = window.GameEngine || {};
    window.GameEngine.Scene = Scene;
})();
