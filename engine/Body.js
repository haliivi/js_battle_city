(function () {
    'use strict';

    class Body extends GameEngine.Sprite {
        constructor(...args) {
            super(...args);
            const { body = {}, textureSettings, debug = false } = args[1];
            this.debug = debug;
            this.textureSettings = textureSettings;
            this.body = {
                x: body.x || 0,
                y: body.y || 0,
                width: body.width || textureSettings.width || 1,
                height: body.height || textureSettings.height || 1,
            };
        }

        draw(canvas, context) {
            if (this.visible) {
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
                if (this.debug) {
                    context.fillStyle = 'rgba(255, 0, 0, 0.5)';
                    context.beginPath();
                    context.rect(
                        this.absoluteX - this.x + this.body.x * this.width,
                        this.absoluteY - this.y + this.body.y * this.height,
                        this.width * this.body.width,
                        this.height * this.body.height,
                    );
                    context.fill();
                }
                context.restore();
            }
        }
    }

    window.GameEngine = window.GameEngine || {};
    window.GameEngine.Body = Body;
})();
