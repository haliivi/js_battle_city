(function () {
    'use strict';

    class Point extends GameEngine.DisplayObject {
        constructor(args = {}) {
            super(args);
            this.color = args.color || 'red';
        }
        draw(canvas, context) {
            super.draw(() => {
                context.beginPath();
                context.fillStyle = this.color;
                context.arc(this.x, this.y, 2, 0, Math.PI * 2);
                context.fill();
            });
        }
    }

    window.GameEngine = window.GameEngine || {};
    window.GameEngine.Point = Point;
})();
