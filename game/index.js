const { Game, Scene, Point, Line, Container, Body, Util } = GameEngine;

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
        });
        this.man.setFramesCollection(manAtlas.frames);
        this.man.setAnimationsCollection(manAtlas.actions);
        this.man.startAnimation('stayDown');
        this.add(this.tank);
        this.add(this.man);
    },
    update(timestamp) {
        const { arrowUp, arrowDown, arrowLeft, arrowRight } =
            this.parent.keyboard.keys;
        this.man.velocity.x = 0;
        this.man.velocity.y = 0;
        if (arrowUp) {
            this.man.velocity.y = -1.5;
            if (this.man.animation !== 'moveUp') {
                this.man.startAnimation('moveUp');
            }
        } else if (arrowDown) {
            this.man.velocity.y = +1.5;
            if (this.man.animation !== 'moveDown') {
                this.man.startAnimation('moveDown');
            }
        } else if (arrowLeft) {
            this.man.velocity.x = -1.5;
            if (this.man.animation !== 'moveLeft') {
                this.man.startAnimation('moveLeft');
            }
        } else if (arrowRight) {
            this.man.velocity.x = +1.5;
            if (this.man.animation !== 'moveRight') {
                this.man.startAnimation('moveRight');
            }
        } else if (this.man.animation === 'moveDown') {
            this.man.startAnimation('stayDown')
        } else if (this.man.animation === 'moveUp') {
            this.man.startAnimation('stayUp')
        }
    },
});

const game = new Game({
    scenes: [mainScene],
});
