;(function () {
    'use strict'
    
    class Sprite {
        constructor (texture, {x, y, width, height, frame={}}) {
            this.texture = texture
            this.frame = {
                x: frame.x || 0,
                y: frame.y || 0,
                width: frame.width || texture.width,
                height: frame.height || texture.height,
            }
            this.x = x || 0
            this.y = y || 0
            this.width = width || this.frame.width
            this.height = height || this.frame.height
        }
        
        setScale (value) {
            this.scaleX = this.scaleY = value
        }

        get scaleX () {
            return this.width / this.frame.width
        }

        set scaleX (value) {
            this.width = this.frame.width * value
        }

        get scaleY () {
            return this.height / this.frame.height
        }

        set scaleY (value) {
            this.height = this.frame.height * value
        }


        draw (canvas, context) {
            context.drawImage(
                this.texture,

                this.frame.x,
                this.frame.y,
                this.frame.width,
                this.frame.height,
                
                this.x,
                this.y,
                this.width,
                this.height,
            )
        }
    }
    window.GameEngine = window.GameEngine || {};
    window.GameEngine.Sprite = Sprite;
})()