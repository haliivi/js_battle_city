(function () {
    'use strict';

    class Scene {
        constructor() {
            console.log('Scene');
        }
    }

    window.GameEngine = window.GameEngine || {};
    window.GameEngine.Scene = Scene;
})();
