function Shape(options) {
    var _that = this;
    _that.type = 'shape';

    _that.init(options);
}

Shape.prototype = {
    init: function (options) {

        this.generateSprite();
        this.sprite.x = options.x !== undefined ? options.x : Math.random() * (options.parent.screenWidth -20) + 20;
        this.sprite.y = options.y !== undefined ? options.y : -50;
        this.speed = options.speed !== undefined ? options.speed : 0;

        this.onShapeClicked = new Event();
        this.onRemoveMe = new Event();
        this.onChangeColorOfMyBrothers = new Event();
    },
    remove: function(){
        this.sprite.destroy({
            texture: true,
            baseTexture: true
        });
    },
    update: function (gravity) {
        this.speed += gravity;
        this.sprite.y += this.speed;
    },
    generateSprite: function () {
        //3 angles
        var graphics = new PIXI.Graphics();

        // set a fill and line style
        graphics.beginFill(0xFF3300);
        graphics.lineStyle(4, 0xffd900, 1);

        // draw a shape
        graphics.moveTo(0, 0);
        graphics.lineTo(30, 20);
        graphics.lineTo(20, 40);
        graphics.lineTo(10, 10);
        graphics.endFill();

        var texture = graphics.generateCanvasTexture(graphics);
        this.sprite = PIXI.Sprite.from(texture, 40, 40);
        this.sprite.anchor.set(0.5);

    },
    doInteraction: function (e) {
        this.shapeClicked.notify();

        //
        if (false) {
            this.onRemoveMe.notify(this);
        }

        if (false) {
            this.onChangeColorOfMyBrothers();
        }
    }
};