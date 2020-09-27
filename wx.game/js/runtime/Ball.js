import {Sprite} from "../base/Sprite.js";
import {Director} from "../Director.js";

export class Ball extends Sprite {
    constructor() {
        const image = Sprite.grtImage('ball');

        super(image,
            0, 0,
            image.width, image.height,
            0, 0,
            image.width * 2, image.height * 2);

        this.ballX = window.innerWidth/2;
        this.ballY = window.innerHeight/2;
        this.ballSpeed=Math.ceil(Math.random()*8-5);
        if (this.ballSpeed<=1&&this.ballSpeed>=0){
            this.ballSpeed+=3;
        } else if (this.ballSpeed>=-1&&this.ballSpeed<0){
            this.ballSpeed-=3;
        }
        this.ballSpeedX = this.ballSpeed;
        this.ballSpeedY = this.ballSpeed;
    }

    draw() {
        this.ballX = this.ballX - this.ballSpeedX;
        this.ballY = this.ballY + this.ballSpeedY;
        super.draw(this.img,
            this.srcX,
            this.srcY,
            this.srcW,
            this.srcH,
            this.ballX,
            this.ballY,
            this.width,
            this.height)
    }
}