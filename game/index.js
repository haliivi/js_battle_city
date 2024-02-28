const { Game, Scene, Point, Line, Container, Body } = GameEngine;

const mainScene = new Scene({
    name: (name = 'mainScene'),
    autoStart: true,
    loading(loader) {
        loader.addImage('tank', './static/TANK.jpg');
        loader.addJSON('persons', './static/persons.json');
    },
    init() {
        const tankTexture = this.parent.loader.getImage('tank');

        this.tank = new Body(tankTexture, {
            textureSettings: {
                x: this.parent.renderer.canvas.width / 2,
                y: this.parent.renderer.canvas.height / 2,
            },
            scale: 0.25,
            anchorX: 0.5,
            anchorY: 0.5,
            debug: true,
        });
        this.add(this.tank);
    },
    update(timestamp) {
        const { arrowUp, arrowDown, arrowLeft, arrowRight } =
            this.parent.keyboard.keys;
        arrowUp && this.tank.y--;
        arrowDown && this.tank.y++;
        arrowLeft && this.tank.x--;
        arrowRight && this.tank.x++;
    },
});

const game = new Game({
    scenes: [mainScene],
});
