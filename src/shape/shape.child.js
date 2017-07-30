function Shape2(options) {
    var _that = this;
    _that.type = 'shape2';
    this.init(options);
}

Shape2.prototype = Object.create(Shape.prototype);
Shape2.prototype.generateSprite = function () {

    var graphics = new PIXI.Graphics();

    this.color = this.getRandomColor(1, 16777215, 16);
    this.line = this.getRandomColor(1, 16777215, 16);

    graphics.beginFill(this.color);
    graphics.lineStyle(4, this.line, 1);

    this.points = [
        {
            x: Math.random() * 10 + 10,
            y: Math.random() * 10 + 10
        },
        {
            x: Math.random() * 10 + 30,
            y: Math.random() * 10 + 10
        },
        {
            x: Math.random() * 10 + 30,
            y: Math.random() * 10 + 30
        },
        {
            x: Math.random() * 10 + 10,
            y: Math.random() * 10 + 30
        }
    ];

    //too boored....
    this.area = Math.random() * 15 + 50;

    for (var index = 0; index < this.points.length; index++) {
        var point = this.points[index];
        if (index == 0) {
            graphics.moveTo(point.x, point.y);
        } else {
            graphics.lineTo(point.x, point.y);
        }
    }
    graphics.endFill();

    var texture = graphics.generateCanvasTexture(graphics);
    this.sprite = PIXI.Sprite.from(texture, 60, 60);
    this.sprite.owner = this;
    this.sprite.anchor.set(0.5);
    this.sprite.interactive = true;
    this.sprite.buttonMode = true;
    this.sprite.x = this.x;
    this.sprite.y = this.y;
};

function ShapeCirle(options) {
    var _that = this;
    _that.type = 'circle';
    this.init(options);
}

ShapeCirle.prototype = Object.create(Shape.prototype);
ShapeCirle.prototype.generateSprite = function () {

    var graphics = new PIXI.Graphics();

    this.color = this.getRandomColor(1, 16777215, 16);
    this.line = this.getRandomColor(1, 16777215, 16);

    graphics.beginFill(this.color);
    graphics.lineStyle(4, this.line, 1);

    this.size = Math.random() * 5 + 15;
    this.area = this.size * this.size * Math.PI;

    graphics.drawCircle(30, 30, this.size);
    graphics.endFill();

    var texture = graphics.generateCanvasTexture(graphics);
    this.sprite = PIXI.Sprite.from(texture, 60, 60);
    this.sprite.owner = this;
    this.sprite.anchor.set(0.5);
    this.sprite.interactive = true;
    this.sprite.buttonMode = true;
    this.sprite.x = this.x;
    this.sprite.y = this.y;
};
ShapeCirle.prototype.changeColor = function () {
    var graphics = new PIXI.Graphics();

    this.color = this.getRandomColor(1, 16777215, 16);
    this.line = this.getRandomColor(1, 16777215, 16);

    graphics.beginFill(this.color);
    graphics.lineStyle(4, this.line, 1);
    graphics.drawCircle(30, 30, this.size);
    graphics.endFill();

    var texture = graphics.generateCanvasTexture(graphics);
    this.sprite.texture = texture;
};