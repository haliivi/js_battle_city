const {Sprite, Game, Scene} = GameEngine
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
        this.add(this.sprite)
    },

    update (timestamp) {
        this.sprite.rotation = timestamp / 1000
    },
})
const game = new Game ({
    el: document.body,
    width: 400,
    height: 400,
    scenes: [mainScene],
})