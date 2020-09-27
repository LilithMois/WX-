// 逻辑

import {DataStore} from "./base/DataStore.js";
import {Cloud} from "./runtime/Cloud.js";

export class Director {

    static getInstance() {
        if (!Director.instance) {
            Director.instance = new Director();
        }
        return Director.instance;
    }

    constructor() {
        this.dataStore = DataStore.getInstance();
        this.moveSpeed = 2;
    }

    createCloud() {
        this.dataStore.get('clouds').push(new Cloud());
    }

    wallEvent(e) {
        for (let i = 0; i < e.touches.length; i++) {
            if (e.touches[i].pageY < window.innerHeight / 2) {
                this.dataStore.get('wallone').WallX = e.touches[i].pageX - this.dataStore.get('wallone').img.width;
            } else {
                this.dataStore.get('walltwo').WallX = e.touches[i].pageX - this.dataStore.get('walltwo').img.width;
            }
        }
    }

    //判断
    check() {
        const wallone = this.dataStore.get('wallone');
        const walltwo = this.dataStore.get('walltwo');
        const balls = this.dataStore.get('ball');
        const speed = this.dataStore.get('speed');
        speed.speedNumber = Math.abs(balls.ballSpeedY);
        // for (let i = 0; i <= balls.length; i++) {
        //     if (balls[i].ballX <= 0 || balls[i].ballX + balls[i].width * 2 >= window.innerWidth) {
        //         balls[i].ballSpeedX *= -1;
        //         console.log(1);
        //     }
        //
        if (balls.ballX <= 0 || balls.ballX + balls.width >= innerWidth) {
            balls.ballSpeedX *= -1;
        }
        if (balls.ballX > wallone.WallX && balls.ballX < wallone.WallX + wallone.width && balls.ballY < wallone.WallY + wallone.height) {
            balls.ballSpeedY *= -1;
            balls.ballSpeedX+=Math.ceil(Math.random());
            balls.ballSpeedY+=Math.ceil(Math.random()*2);
        }
        if (balls.ballX > walltwo.WallX && balls.ballX < walltwo.WallX + walltwo.width && balls.ballY > walltwo.WallY - wallone.height * 2 + balls.height) {
            balls.ballSpeedY *= -1;
            balls.ballSpeedX+=Math.ceil(Math.random());
            balls.ballSpeedY-=Math.ceil(Math.random()*2);
        }
        if (balls.ballY < 0 || balls.ballY > window.innerHeight - balls.height) {
            this.isGameOver = true;
            return;
        }
    }


    run() {
        if (this.isGameOver===true) {
            this.dataStore.get('background').draw();
            this.dataStore.get('wallone').draw();
            this.dataStore.get('walltwo').draw();
        }
        this.check();
        if (!this.isGameOver) {
            this.dataStore.get('background').draw();

            const clouds = this.dataStore.get('clouds');
            if (clouds.length <= 10) {
                this.createCloud();
            }
            this.dataStore.get('clouds').forEach(function (value) {
                value.draw();
            });
            this.dataStore.get('wallone').draw();
            this.dataStore.get('walltwo').draw();
            this.dataStore.get('speed').draw();
            this.dataStore.get('ball').draw();
            let timer = requestAnimationFrame(() => this.run());
            this.dataStore.put('timer', timer);
        } else {
            this.dataStore.get('startbutton').draw();
            cancelAnimationFrame(this.dataStore.get('timer'));
            this.dataStore.destroy();
        }

    }
}