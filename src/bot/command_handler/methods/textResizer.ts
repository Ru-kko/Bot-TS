import {CanvasRenderingContext2D as context } from "canvas";

interface textBoxOptions{
    x: number;
    y: number;
    width: number;
    rows: number;
    textSize?: number;
    color?: string;
}

export default (ctx:context, text: string, options:textBoxOptions) =>{
    ctx.beginPath();
    var words = text.split(' ');
    var size = options.textSize || 18;

    ctx.fillStyle = options.color || '#FFFFFF';
    ctx.font = `${size}px MPLUS`

    let split:string[]= [];


    const div = (_:string[]):number => {
        var txt = _.slice();

        while(ctx.measureText(txt.join(' ')).width > options.width){
            txt.pop();
        };
        split.push(txt.join(' '));
        return txt.length;
    }
    for(var i = 0; i< options.rows; i++){
        var txt = words.slice();

        while(ctx.measureText(txt.join(' ')).width > options.width){
            txt.pop();
        };
        ctx.fillText(txt.join(' '), options.x, options.y, options.width);

        txt = words.splice(0, txt.length);
    };
    ctx.closePath();
};
//function textbox(ctx, texto, x, y, width, color, nReenglones, size) {

    //     ctx.fillStyle = color
    //     ctx.font = `${size}px MPLUS`
    //     let diviciones = []
      
      
    //     function dividir(txt) {
    //       var reenglon = txt
    //       var largo = txt.length
    //       while (ctx.measureText(reenglon).width > width) {
    //         reenglon = txt.slice(0, largo - 1)
    //         largo = largo - 1
    //       }
    //       diviciones.push(reenglon)
    //     }
      
    //     for (var i = 0; i < nReenglones; i++) {
    //       if (i === 0) {
    //         dividir(texto)
    //       }
    //       else {
    //         //console.log(texto.slice(diviciones[i-1].length , texto.length))
    //         dividir(texto.slice(diviciones.join("").length, texto.length))
    //       }
    //     }
    //     for (var i = 0; i < diviciones.length; i++) {
    //       ctx.fillText(diviciones[i], x, ((size * i) + y) + size)
    //     }
    //   }