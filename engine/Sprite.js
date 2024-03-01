(function () {
    'use strict';

    class Sprite extends GameEngine.DisplayObject {
        constructor(
            texture,
            {
                textureSettings = {},
                frameSettings = {},
                anchorX = 0,
                anchorY = 0,
                scale = 1,
                rotation = 0,
                visible = true,
                velocity = { x: 0, y: 0 },
            } = {},
        ) {
            super({
                textureSettings,
                anchorX,
                anchorY,
                scale,
                rotation,
                visible,
            });
            this.texture = texture;
            this.velocity = { x: velocity.x || 0, y: velocity.y ||0 };
            this.frame = {
                x: frameSettings.x || 0,
                y: frameSettings.y || 0,
                width: frameSettings.width || texture.width,
                height: frameSettings.height | texture.height,
            };
            this.width = this.width || this.frame.width;
            this.height = this.height || this.frame.height;
        }

        tick(timestamp) {
            this.x += this.velocity.x;
            this.y += this.velocity.y;
        }

        draw(canvas, context) {
            super.draw(() => {
                context.save();
                context.translate(this.x, this.y);
                context.rotate(-this.rotation);
                context.scale(this.scaleX, this.scaleY);
                context.drawImage(
                    this.texture,

                    this.frame.x,
                    this.frame.y,
                    this.frame.width,
                    this.frame.height,

                    this.absoluteX - this.x,
                    this.absoluteY - this.y,
                    this.width,
                    this.height,
                );
                context.restore();
            });
        }
    }

    window.GameEngine = window.GameEngine || {};
    window.GameEngine.Sprite = Sprite;
})();
