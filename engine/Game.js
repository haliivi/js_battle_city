(function () {
    'use strict';

    class Game {
        constructor() {
            console.log('Game');
        }
    }

    window.GameEngine = window.GameEngine || {};
    window.GameEngine.Game = Game;
})();
