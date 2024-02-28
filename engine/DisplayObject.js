(function () {
    'use strict';

    class DisplayObject {
        constructor({
            textureSettings = {},
            rotation = 0,
            anchorX = 0,
            anchorY = 0,
            scaleX = 1,
            scaleY = 1,
            scale = 1,
            visible = true,
        } = {}) {
            this.width = textureSettings.width;
            this.height = textureSettings.height;
            this.x = textureSettings.x || 0;
            this.y = textureSettings.y || 0;
            this.rotation = rotation;
            this.anchorX = anchorX;
            this.anchorY = anchorY;
            this.scaleX = scaleX;
            this.scaleY = scaleY;
            this.parent = null;
            this.visible = visible;
            scale !== 1 && this.setScale(scale);
        }

        get absoluteX() {
            return this.x - this.anchorX * this.width;
        }

        set absoluteX(value) {
            this.x = value + this.anchorX * this.width;
            return value;
        }

        get absoluteY() {
            return this.y - this.anchorY * this.height;
        }

        set absoluteY(value) {
            this.y = value + this.anchorY * this.height;
            return value;
        }

        setScale(scale) {
            this.scaleX = this.scaleY = scale;
            return scale;
        }

        setParent(parent) {
            if (this.parent && this.parent.remove) {
                this.parent.remove(this);
            }
            if (parent && parent.add) {
                parent.add(this);
                this.parent = parent;
            }
        }

        draw(callback) {
            this.visible && callback();
        }
    }

    window.GameEngine = window.GameEngine || {};
    window.GameEngine.DisplayObject = DisplayObject;
})();
