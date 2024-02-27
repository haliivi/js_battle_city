(function () {
    'use strict';

    class Game {
        constructor({
            el = document.body,
            width = 500,
            height = 500,
            background = 'green',
            scenes = [],
        } = {}) {
            this.renderer = new GameEngine.Renderer({
                width,
                height,
                background,
            });
            this.loader = new GameEngine.Loader();
            this.scenesCollection = new GameEngine.Container();
            this.addScenes(...scenes);
            el && el.appendChild && el.appendChild(this.renderer.canvas);
            const autostartedScenes = this.scenes.filter(
                (scene) => scene.autoStart,
            );
            autostartedScenes.forEach((scene) => {
                scene.loading(this.loader);
                scene.status = 'loading';
            });
            this.loader.load(() => {
                autostartedScenes.forEach((scene) => {
                    scene.init();
                    scene.status = 'init';
                });
                autostartedScenes.forEach((scene) => {
                    scene.status = 'started';
                });
            });
            requestAnimationFrame((timestamp) => this.tick(timestamp));
        }

        get scenes() {
            return this.scenesCollection.displayObjects;
        }

        addScenes(...scenes) {
            this.scenesCollection.add(...scenes);
            scenes.forEach((scene) => (scene.parent = this));
        }

        tick(timestamp) {
            this.scenes
                .filter((scene) => scene.status === 'started')
                .forEach((scene) => scene.update());
            this.renderer.clear();
            requestAnimationFrame((timestamp) => this.tick(timestamp));
        }
    }

    window.GameEngine = window.GameEngine || {};
    window.GameEngine.Game = Game;
})();
