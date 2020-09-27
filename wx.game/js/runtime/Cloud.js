import {Sprite} from "../base/Sprite.js";
import {Director} from "../Director.js";

export class Cloud extends Sprite {
    constructor() {
        const image = Sprite.grtImage('cloud');

        super(image, 0, 0,
            image.width, image.height,
            0, Math.ceil(Math.random()*window.innerHeight),
            image.width, image.height);

        this.cloudX =  Math.ceil(Math.random()*window.innerWidth);
        this.cloudSpeed = Director.getInstance().moveSpeed;
    }


    draw() {
        this.cloudX = this.cloudX + this.cloudSpeed;
        if(this.cloudX>window.innerWidth){
            this.cloudX=-this.img.width;
            this.y=Math.ceil(Math.random()*window.innerHeight);
        }
        super.draw(this.img,
            this.srcX,
            this.srcY,
            this.srcW,
            this.srcH,
            this.cloudX,
            this.y,
            this.width,
            this.height)
    }

}