const { Game, Scene, Point, Line, Container, Body, Util } = GameEngine;

let n = 1;

const mainScene = new Scene({
    name: (name = 'mainScene'),
    autoStart: true,
    loading(loader) {
        loader.addImage('tank', './static/TANK.jpg');
        loader.addImage('man', './static/man.png');
        loader.addJSON('persons', './static/persons.json');
        loader.addJSON('manAtlas', './static/manAtlas.json');
    },
    init() {
        const tankTexture = this.parent.loader.getImage('tank');
        const manTexture = this.parent.loader.getImage('man');
        const manAtlas = this.parent.loader.getJSON('manAtlas');

        console.log(manAtlas);

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

        this.man = new Body(manTexture, {
            textureSettings: {
                x: 10,
                y: 20,
            },
            scale: 0.5,
        });

        this.man.setFramesCollection(manAtlas.frames);
        this.man.setAnimationsCollection(manAtlas.actions);
        this.man.startAnimation('moveDown');

        // this.man.setFrameByKeys('man', 'down', 'frame3');
        // this.man.width = this.man.frame.width;
        // this.man.height = this.man.frame.height;

        this.add(this.tank);
        this.add(this.man);
    },
    update(timestamp) {
        const { arrowUp, arrowDown, arrowLeft, arrowRight } =
            this.parent.keyboard.keys;
        // if (Util.delay('manFrameUpdate', 200)) {
        //     n = (n % 4) + 1;
        //     this.man.setFrameByKeys('man', 'down', 'frame' + n);
        // }
        this.tank.velocity.x = 0;
        this.tank.velocity.y = 0;
        arrowUp && this.tank.velocity.y--;
        arrowDown && this.tank.velocity.y++;
        arrowLeft && this.tank.velocity.x--;
        arrowRight && this.tank.velocity.x++;
    },
});

const game = new Game({
    scenes: [mainScene],
});
