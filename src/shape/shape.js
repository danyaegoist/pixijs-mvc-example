function Shape(options) {
    var _that = this;
    _that.type = 'shape';

    _that.init(options);
}

Shape.prototype = {
    init: function (options) {

        this.x = options.x !== undefined ? options.x : Math.random() * (options.parent.screenWidth - 20) + 20;
        this.y = options.y !== undefined ? options.y : -60;
        this.generateSprite();
        this.speed = options.speed !== undefined ? options.speed : 0;

        //it must be in view or control...but it's only one...so...and it's small hack...
        this.sprite.on('pointerdown', function (e) {
            //catch click, but handle it in CORE
        });

        this.onClicked = new Event(this);
    },
    remove: function () {
        this.sprite.destroy({
            texture: true,
            baseTexture: true
        });
    },
    update: function (gravity) {
        this.speed += +gravity;
        this.sprite.y += this.speed;
        this.sprite.y = Math.ceil(this.sprite.y);
    },
    generateSprite: function () {

        var graphics = new PIXI.Graphics();

        this.color = this.getRandomColor(1, 16777215, 16);
        this.line = this.getRandomColor(1, 16777215, 16);

        graphics.beginFill(this.color);
        graphics.lineStyle(4, this.line, 1);

        this.points = [
            {
                x: Math.random() * 10,
                y: Math.random() * 10
            },
            {
                x: Math.random() * 10 + 10,
                y: Math.random() * 20 + 30
            },
            {
                x: Math.random() * 20 + 30,
                y: Math.random() * 10 + 10
            }
        ];

        var a = Math.sqrt(Math.pow(this.points[1].x -this.points[0].x, 2) + Math.pow(this.points[1].y -this.points[0].y, 2));
        var b = Math.sqrt(Math.pow(this.points[2].x -this.points[1].x, 2) + Math.pow(this.points[2].y -this.points[1].y, 2));
        var c = Math.sqrt(Math.pow(this.points[0].x -this.points[2].x, 2) + Math.pow(this.points[0].y -this.points[2].y, 2));
        var p = (a + b + c) / 2;
        this.area = Math.sqrt(p * (p-a) * (p-b) * (p-c));

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
    },
    changeColor: function () {
        var graphics = new PIXI.Graphics();

        this.color = this.getRandomColor(1, 16777215, 16);
        this.line = this.getRandomColor(1, 16777215, 16);

        graphics.beginFill(this.color);
        graphics.lineStyle(4, this.line, 1);
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
        this.sprite.texture = texture;
    },
    getRandomColor: function (min, max, radix) {
        return parseInt(((Math.random() * (max - min)) + min).toString(radix), radix);
    }
};