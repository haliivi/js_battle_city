;(function () {
    'use strict'

    class DisplayObject {
        constructor (args = {}) {
            const {x=0, y=0, width=0, height=0, rotation=0, anchorX=0, anchorY=0, scale=1} = args
            this.x = x
            this.y = y
            this.width = width
            this.height = height
            this.rotation = rotation
            this.anchorX = anchorX
            this.anchorY = anchorY
            this.parent = null
            this.visible = true
            !scale || this.setScale(scale)
        }
        setParent (parent) {
            if (this.parent) {
                this.parent.remove(this)
            }
            if (parent) {
                parent.add(this)
                this.parent = parent
            }
        }

        get absoluteX () {
            return this.x - this.anchorX * this.width
        }

        get absoluteY () {
            return this.y - this.anchorY * this.height
        }
        
        set absoluteX (value) {
            this.x = value + this.anchorX * this.width
        }

        set absoluteY (value) {
            this.y = value + this.anchorY * this.height
        }

        setScale (value) {
            this.scaleX = this.scaleY = value
        }

        draw (callback) {
            if (this.visible) {
                callback()
            }
        }
    }

    window.GameEngine = window.GameEngine || {};
    window.GameEngine.DisplayObject = DisplayObject;
})();