import {Sprite} from "../base/Sprite.js";

export class WallOne extends Sprite{
    constructor(){
        const image = Sprite.grtImage('wallone');
        super(image, 0, 0,
            image.width, image.height,
            0, 0,
            image.width*2, image.height*2);

        this.WallX=window.innerWidth/2-this.img.width;
        this.WallY=0;
    }
    draw() {
        super.draw(this.img,
            this.srcX,
            this.srcY,
            this.srcW,
            this.srcH,
            this.WallX,
            this.WallY,
            this.width,
            this.height)
    }
}