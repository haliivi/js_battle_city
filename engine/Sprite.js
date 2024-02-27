(function () {
    'use strict';

    class Sprite {
        constructor(
            texture,
            {
                textureSettings = {},
                frameSettings = {},
                anchorX = 0,
                anchorY = 0,
                scale = 1,
            } = {},
        ) {
            this.texture = texture;
            this.frame = {
                x: frameSettings.x || 0,
                y: frameSettings.y || 0,
                width: frameSettings.width || texture.width,
                height: frameSettings.height | texture.height,
            };
            this.x = textureSettings.x || 0;
            this.y = textureSettings.y || 0;
            this.anchorX = anchorX;
            this.anchorY = anchorY;
            this.width = textureSettings.width || this.frame.width;
            this.height = textureSettings.height || this.frame.height;
            scale !== 1 && this.setScale(scale);
        }

        get scaleX() {
            return this.width / this.frame.width;
        }

        set scaleX(value) {
            this.width = this.frame.width * value;
            return value;
        }

        get scaleY() {
            return this.height / this.frame.height;
        }

        setScale(value) {
            this.scaleX = this.scaleY = value;
            return value;
        }

        set scaleY(value) {
            this.height = this.frame.height * value;
            return value;
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

        draw(canvas, context) {
            context.drawImage(
                this.texture,

                this.frame.x,
                this.frame.y,
                this.frame.width,
                this.frame.height,

                this.absoluteX,
                this.absoluteY,
                this.width,
                this.height,
            );
        }
    }

    window.GameEngine = window.GameEngine || {};
    window.GameEngine.Sprite = Sprite;
})();
