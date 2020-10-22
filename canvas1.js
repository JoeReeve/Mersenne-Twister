import  MersenneTwister  from './MT.js';


window.addEventListener('load', () => {
    //first canvas
    const canvas1 = document.querySelector('#canvas1');
    const ctx = canvas1.getContext('2d');

    let height = window.innerHeight;
    let width = window.innerWidth;
    canvas1.height = height/2;
    canvas1.width = width/2;

    var MT = new MersenneTwister();

    for (var x = 0; x<height; x++) {
        for (var y = 0; y<width; y++) {
            var r = Math.floor((MT.next() * 256) );
            var g = Math.floor((MT.next() * 256) );
            var b = Math.floor((MT.next() * 256) );
            ctx.fillStyle = "rgba(" + r + "," + g + "," + b + "," + 1 + ")";
            ctx.fillRect(x,y,1,1);

        }
    }
})