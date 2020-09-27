//计分器类

import {DataStore} from "../base/DataStore.js";

export class Speed {
    constructor() {
        this.ctx = DataStore.getInstance().ctx;
        this.speedNumber = 0;
    }

    draw() {
        // this.speedNumber = DataStore.get('ball').ballSpeedX;
        this.ctx.font = '25px Arial';
        this.ctx.fillStyle = '#000000';
        this.ctx.fillText(
            this.speedNumber,
            window.innerWidth / 2,
            window.innerHeight / 2,
            500
        );
    }
}