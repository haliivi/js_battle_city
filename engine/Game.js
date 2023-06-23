;(function () {
    'use strict'

    class Game {
        constructor (args = {}) {
            const {el, width, height, scenes=[]} = args
            this.renderer = new GameEngine.Renderer(args)
            this.loader = new GameEngine.Loader()
            this.scenesCollection = new GameEngine.Container()
            this.keyboard = new GameEngine.Keyboard()
            this.addScene(...scenes)
            if (el && el.appendChild) {
                el.appendChild(this.renderer.canvas)
            }
            const autoStartedScenes = scenes.filter(x => x.autoStart)
            for (const scene of autoStartedScenes) {
                scene.status = 'loading'
                scene.loading(this.loader)
            }
            this.loader.load(() => {
                for (const scene of autoStartedScenes) {
                    scene.status = 'init'
                    scene.init()
                }
                for (const scene of autoStartedScenes) {
                    scene.status = 'started'
                }
            })
            requestAnimationFrame(timestamp => this.tick(timestamp))
        }

        get scenes () {
            return this.scenesCollection.displayObjects
        }

        tick (timestamp) {
            const startedScenes = this.scenes.filter(x => x.status === 'started')
            for (const scene of startedScenes) {
                scene.update(timestamp)
            }
            this.renderer.clear()
            for (const scene of startedScenes) {
                scene.draw(this.renderer.canvas, this.renderer.context)
            }
            requestAnimationFrame(timestamp => this.tick(timestamp))
        }

        addScene (...scenes) {
            this.scenesCollection.add(...scenes)
            for (const scene of scenes) {
                scene.parent = this
            }
        }

        getScene (name) {
            if (name instanceof GameEngine.Scene) {
                if (this.scenes.includes(name)) {
                    return name
                }
            }
            if (typeof(name) === 'string') {
                for (const sceneItem of this.scenes) {
                    if (sceneItem.name === name) {
                        return sceneItem
                    }
                }
            }
        }

        startScene (name) {
            const scene = this.getScene(name)
            if (!scene) {return false}
            scene.status = 'loading'
            scene.loading(this.loader)
            this.loader.load(() => {
                scene.status = 'init'
                scene.init()
                scene.status = 'started'
            })
            return true
        } 

        finishScene (name) {
            const scene = this.getScene(name)
            if (!scene) {return false}
            scene.status = 'finished'
            this.scenesCollection.remove(scene)
            scene.beforeDestroy()
        }
    }

    window.GameEngine = window.GameEngine || {};
    window.GameEngine.Game = Game;
})();