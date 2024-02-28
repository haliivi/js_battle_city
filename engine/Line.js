(function () {
    'use strict';

    class Line extends GameEngine.DisplayObject {
        constructor(args = {}) {
            super(args);
            const { color = 'red', x1 = 0, x2 = 0, y1 = 0, y2 = 0 } = args;
            this.color = color;
            this.x1 = x1;
            this.x2 = x2;
            this.y1 = y1;
            this.y2 = y2;
        }
        draw(canvas, context) {
            super.draw(() => {
                context.beginPath();
                context.strokeStyle = this.color;
                context.lineWidth = 2
                context.moveTo(this.x1, this.y1);
                context.lineTo(this.x2, this.y2);
                context.stroke();
            });
        }
    }

    window.GameEngine = window.GameEngine || {};
    window.GameEngine.Line = Line;
})();
