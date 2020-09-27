//初始化精灵入口


import {ResourceLoader} from "./js/base/ResourceLoader.js";
import {Director} from "./js/Director.js";
import {BackGround} from "./js/runtime/BackGround.js";
import {DataStore} from "./js/base/DataStore.js";
import {Cloud} from "./js/runtime/Cloud.js";
import {WallOne} from "./js/player/WallOne.js";
import {WallTwo} from "./js/player/WallTwo.js";
import {Ball} from "./js/runtime/Ball.js";
import {StartButton} from "./js/player/StartButton.js";
import {Speed} from "./js/player/Speed.js";

export class Main {
    constructor() {
        this.canvas = document.getElementById('game_canvas');
        this.ctx = this.canvas.getContext('2d');
        this.dataStore = DataStore.getInstance();
        this.director = Director.getInstance();
        const loader = ResourceLoader.create();
        loader.onLoaded(map => this.onResourceFirstLoaded(map));


    }

    onResourceFirstLoaded(map) {
        this.dataStore.ctx = this.ctx;
        this.dataStore.res = map;
        this.director.isGameOver = true;
        this.init();
    }

    init() {


        this.dataStore
            .put('clouds', [])
            .put('background', BackGround)
            .put('cloud', Cloud)
            .put('ball', Ball)
            .put('speed', Speed)
            .put('startbutton', StartButton)
            .put('wallone', WallOne)
            .put('walltwo', WallTwo);
        this.registerEvent();
        this.director.createCloud();
        this.director.run();
    }

    registerEvent() {
        this.canvas.addEventListener('touchmove', e => {
            e.preventDefault();
            if (!this.director.isGameOver) {
                this.director.wallEvent(e);
            }
        });
        this.canvas.addEventListener('touchstart', ev => {
            if (this.director.isGameOver && ev.touches[0].pageX > window.innerWidth / 2 - this.dataStore.get('startbutton').width / 2 && ev.touches[0].pageX < window.innerWidth / 2 + this.dataStore.get('startbutton').width / 2
                && ev.touches[0].pageY > window.innerHeight / 2 - this.dataStore.get('startbutton').height / 2 && ev.touches[0].pageY < window.innerHeight / 2 + this.dataStore.get('startbutton').height / 2) {
                this.director.isGameOver = false;
                this.init();
            }
        })
    }
}