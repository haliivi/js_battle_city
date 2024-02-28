(function () {
    'use strict';

    class Scene extends GameEngine.Container {
        constructor({
            autoStart = true,
            name = '',
            loading = () => {},
            init = () => {},
            update = () => {},
            beforeDestroy = () => {},
        }) {
            super();
            this.stage = this.displayObjects;
            this.status = 'waiting';
            this.game = null;
            this.autoStart = autoStart;
            this.loading = loading;
            this.init = init;
            this.update = update;
            this.beforeDestroy = beforeDestroy;
            this.name = name;
        }

        beforeDestroy() {
            Object.keys(this).forEach((key) => delete this[key]);
        }
    }

    window.GameEngine = window.GameEngine || {};
    window.GameEngine.Scene = Scene;
})();
