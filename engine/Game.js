(function () {
    'use strict';

    class Game {
        constructor({ el = document.body, width = 500, height = 500 }={}) {
            this.renderer = new GameEngine.Renderer({width, height})
            el && el.appendChild && el.appendChild(this.renderer.canvas)
        }
    }

    window.GameEngine = window.GameEngine || {};
    window.GameEngine.Game = Game;
})();
