(function () {
    'use strict';

    class Game {
        constructor({
            el = document.body,
            width = 400,
            height = 400,
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
            this.keyboard = new GameEngine.Keyboard();
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
            const startedScenes = this.scenes.filter(
                (scene) => scene.status === 'started',
            );
            startedScenes.forEach((scene) => scene.update(timestamp));
            this.renderer.clear();
            startedScenes.forEach((scene) =>
                scene.draw(this.renderer.canvas, this.renderer.context),
            );
            requestAnimationFrame((timestamp) => this.tick(timestamp));
        }

        getScene(scene) {
            if (
                scene instanceof GameEngine.Scene &&
                this.scenes.includes(scene)
            ) {
                return scene;
            } else if (typeof scene === 'string') {
                let name = scene;
                return this.scenes.filter((scene) => scene.name === name)[0];
            }
        }

        startScene(scene) {
            const detectedScene = this.getScene(scene);
            if (detectedScene) {
                detectedScene.loading(this.loader);
                detectedScene.status = 'loading';
                this.loader.load(() => {
                    detectedScene.init();
                    detectedScene.status = 'init';
                    detectedScene.status = 'started';
                });
                return true;
            } else {
                return false;
            }
        }

        finishScene(scene) {
            const detectedScene = this.getScene(scene);
            detectedScene.status = 'finished';
            this.scenesCollection.remove(detectedScene);
            detectedScene.beforeDestroy();
        }
    }

    window.GameEngine = window.GameEngine || {};
    window.GameEngine.Game = Game;
})();
