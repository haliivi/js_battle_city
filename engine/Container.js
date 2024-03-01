(function () {
    'use strict';

    class Container extends GameEngine.DisplayObject {
        constructor(args = {}) {
            super(args);
            this.displayObjects = [];
        }

        add(...displayObjects) {
            displayObjects.forEach((displayObject) => {
                if (!this.displayObjects.includes(displayObject)) {
                    this.displayObjects.push(displayObject);
                    displayObject.setParent(this);
                }
            });
        }

        remove(...displayObjects) {
            displayObjects.forEach((displayObject) => {
                if (this.displayObjects.includes(displayObject)) {
                    const index = this.displayObjects.indexOf(displayObject);
                    this.displayObjects.splice(index, 1);
                    displayObject.setParent(null);
                }
            });
        }

        tick(timestamp) {
            this.displayObjects.forEach((displayObject) => {
                if (displayObject.tick) {
                    displayObject.tick(timestamp);
                }
            });
        }

        draw(canvas, context) {
            super.draw(() => {
                context.save();
                context.translate(this.x, this.y);
                context.rotate(-this.rotation);
                context.scale(this.scaleX, this.scaleY);
                this.displayObjects.forEach((displayObject) =>
                    displayObject.draw(canvas, context),
                );
                context.restore();
            });
        }
    }

    window.GameEngine = window.GameEngine || {};
    window.GameEngine.Container = Container;
})();
