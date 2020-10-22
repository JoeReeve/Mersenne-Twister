import  MersenneTwister  from './MT.js';


window.addEventListener('load', () => {
    //second canvas
    const canvas2 = document.querySelector('#canvas2');
    const ctx2 = canvas2.getContext('2d');

    let height = window.innerHeight;
    let width = window.innerWidth;
    canvas2.height = height/2;
    canvas2.width = width/2;

    var MT = new MersenneTwister();
 

    for (var x = 0; x<height; x++) {
        for (var y = 0; y<width; y++) {
            ctx2.fillStyle = "rgba(255,255,255,1)";
            ctx2.fillRect(x,y,1,1);
        }
    }
     
    for (var i = 0; i<height*width*2; i++) {
        var x2 = Math.floor(MT.next() * width);
        var y2 = Math.floor(MT.next() * height);
        var pixel = ctx2.getImageData(x2, y2, 1, 1);
        var data = pixel.data;
        ctx2.fillStyle = "rgba(" + (data[0]) + "," + (data[1] - 60) + "," + (data[2] - 60) + "," + 1 + ")"; 
        //ctx2.fillStyle = "rgba(" + (data[0] - 60) + "," + (data[1] - 60) + "," + (data[2] - 60) + "," + 1 + ")"; 
        ctx2.fillRect(x2,y2,1,1);
    } 
})