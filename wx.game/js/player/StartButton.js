// 按钮

import {Sprite} from "../base/Sprite.js";

export class StartButton extends Sprite {

    constructor() {

        const image = Sprite.grtImage('startbutton');
        super(image, 0, 0,
            image.width, image.height,
            (window.innerWidth - image.width) / 2,
            (window.innerHeight - image.height) / 2,
            image.width, image.height
        );
    }
}