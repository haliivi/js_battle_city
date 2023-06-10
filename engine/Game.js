;(function () {
    'use strict'

    class Game {
        constructor (args = {}) {
            const {el, width, height} = args
            this.renderer = new GameEngine.Renderer(args)
            if (el && el.appendChild) {
                el.appendChild(this.renderer.canvas)
            }
        }
    }

    window.GameEngine = window.GameEngine || {};
    window.GameEngine.Game = Game;
})();