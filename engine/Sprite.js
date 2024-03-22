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
            this.velocity = { x: velocity.x || 0, y: velocity.y || 0 };
            this.frame = {
                x: frameSettings.x || 0,
                y: frameSettings.y || 0,
                width: frameSettings.width || texture.width,
                height: frameSettings.height | texture.height,
            };
            this.frames = [];
            this.animations = {};
            this.frameNumber = 0;
            this.animation = '';
            this.frameDelay = 0;
            this.width = this.width || this.frame.width;
            this.height = this.height || this.frame.height;
        }

        tick(timestamp) {
            if (
                this.animation &&
                Util.delay(this.animation + this.uid, this.frameDelay)
            ) {
                const { frames } = this.animations[this.animation];
                this.frameNumber = (this.frameNumber + 1) % frames.length;
                this.setFrameByKeys(...frames[this.frameNumber]);
            }
            this.x += this.velocity.x;
            this.y += this.velocity.y;
        }

        setFrameByKeys(...keys) {
            const frame = this.getFrameByKeys(...keys);
            if (!frame) return false;
            this.frame.x = frame.x;
            this.frame.y = frame.y;
            this.frame.width = frame.width;
            this.frame.height = frame.height;
            this.width = this.frame.width;
            this.height = this.frame.height;
        }

        getFrameByKeys(...keys) {
            for (const frame of this.frames) {
                if (keys.every((key) => frame.keys.includes(key))) {
                    return frame;
                }
            }
        }

        setFramesCollection(framesCollection) {
            this.frames = framesCollection;
        }

        setAnimationsCollection(animationsCollection) {
            this.animations = animationsCollection;
        }

        startAnimation(name) {
            if (!this.animations.hasOwnProperty(name)) {
                return false;
            }
            const { duration = Infinity, frames } = this.animations[name];
            this.animation = name;
            this.frameDelay = duration / frames.length;
            this.setFrameByKeys(...frames[0]);
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
