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
    var words = text.split(' ');
    let split:Array<string> = [];
    var lastSplit = words.length;
    var size = options.textSize || 18;

    ctx.fillStyle = options.color || '#FFFFFF';
    ctx.font = `${size}px MPLUS`

    const div =  (txt:string) =>{
        var textSplit = txt.split(' ');
        var lenght = textSplit.length;

        while (ctx.measureText(textSplit.join(' ')).width > options.width){
            lenght -= 1;
            textSplit.slice(0, lenght);
        };
        lastSplit = textSplit.length;
        split.push(textSplit.join(' '));
    };
    for(var i = 0; i< options.rows; i++){
        words.slice(words.length - length, words.length);
        div(words.join(' '));
    };
    for(var i = 0; i < split.length; i++){
        ctx.fillText(split[i], options.x, ((size * i ) + options.y ) + size)
    }
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