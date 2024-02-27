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
            this.renderer = new GameEngine.Renderer({ width, height, background });
            el && el.appendChild && el.appendChild(this.renderer.canvas);
        }
    }

    window.GameEngine = window.GameEngine || {};
    window.GameEngine.Game = Game;
})();
