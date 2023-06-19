const {Sprite, Game, Scene, Point, Line, Container} = GameEngine
const mainScene = new Scene ({
    loading (loader) {
        loader.addImage('sample', 'static/sample.jpg')
        loader.addJson('persons', 'static/persons.json')
    },

    init (loader) {
        const bunnyTexture = this.parent.loader.getImage('sample')
        this.sprite = new Sprite(
            bunnyTexture,
            {
                scale: 0.5,
                width: 100,
                height: 100,
                anchorX: 0.5,
                anchorY: 0.5,
                x: this.parent.renderer.canvas.width / 2,
                y: this.parent.renderer.canvas.height / 2,
            }
        )
        this.point = new Point({
            x: this.sprite.x,
            y: this.sprite.y,
        })
        this.line = new Line({
            x2: this.parent.renderer.canvas.width,
            y2: this.parent.renderer.canvas.height 
        })
        this.add(this.sprite, this.point, this.line)
    },

    update (timestamp) {
        const { keyboard } = this.parent
        let speedRotatio = keyboard.space ? Math.PI / 100 : Math.PI / 300
        if (keyboard.arrowUp) {
            this.sprite.rotation += speedRotatio
        }
        if (keyboard.arrowDown) {
            this.sprite.rotation -= speedRotatio
        }
    },
})
const game = new Game ({
    el: document.body,
    width: 400,
    height: 400,
    scenes: [mainScene],
})