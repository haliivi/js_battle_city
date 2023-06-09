;(function () {
    'use strict'
    
    class Sprite extends GameEngine.DisplayObject {
        constructor (texture, args={}) {
            super(args)
            const {frame={}} = args
            this.texture = texture
            this.frame = {
                x: frame.x || 0,
                y: frame.y || 0,
                width: frame.width || texture.width,
                height: frame.height || texture.height,
            }
        }

        draw (canvas, context) {
            super.draw(() => {
                context.save()
                context.translate(this.x, this.y)
                context.rotate(this.rotation)
                context.scale(this.scaleX, this.scaleY)
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
                )
                context.restore()
            })
        }
    }
    window.GameEngine = window.GameEngine || {};
    window.GameEngine.Sprite = Sprite;
})()