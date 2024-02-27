(function () {
    'use strict';

    class Renderer {
        constructor({ width = 500, height = 500, background = 'balck', update }={}) {
            this.canvas = document.createElement('canvas');
            this.context = this.canvas.getContext('2d');
            this.canvas.width = width;
            this.canvas.height = height;
            this.background = background;
            this.update = update || (() => {});
        }

        // render() {
        //     this.stage.draw(this.canvas, this.context);
        // }

        clear() {
            this.context.fillStyle = this.background;
            this.context.beginPath();
            this.context.rect(0, 0, this.canvas.width, this.canvas.height);
            this.context.fill();
        }

        // get displayObjects() {
        //     return _getDisplayObjects(this.stage);
        //     function _getDisplayObjects(container, result = []) {
        //         container.displayObjects.forEach((displayObject) => {
        //             if (displayObject instanceof GameEngine.Container) {
        //                 _getDisplayObjects(displayObject, result);
        //             } else {
        //                 result.push(displayObject);
        //             }
        //         });
        //         return result;
        //     }
        // }
    }

    window.GameEngine = window.GameEngine || {};
    window.GameEngine.Renderer = Renderer;
})();
