function Shape2(options) {
    var _that = this;
    _that.type = 'shape2';
    this.init(options);
}

Shape2.prototype = Object.create(Shape.prototype);
Shape2.prototype.generateSprite = function () {
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

    var texture = graphics.generateTexture(graphics);
    this.sprite = PIXI.Sprite.from(texture, 40, 40);
    this.sprite.anchor.set(0.5);
};

function ShapeCirle(options) {
    var _that = this;
    _that.type = 'circle';
    this.init(options);
}

ShapeCirle.prototype = Object.create(Shape.prototype);
ShapeCirle.prototype.generateSprite = function () {
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

    var texture = graphics.generateTexture(graphics);
    this.sprite = PIXI.Sprite.from(texture, 40, 40);
    this.sprite.anchor.set(0.5);
};
