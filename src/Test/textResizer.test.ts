import Canvas from "canvas";
import fs from 'fs';
import resizer from "../bot/command_handler/methods/textResizer";

Canvas.registerFont('./public/MPLUS.ttf', {family: 'MPLUS'})

async function test() {
    const _ = Canvas.createCanvas(400, 600);
    const ctx = _.getContext('2d');

    const text = 'the cat is in the bed while he is slepping i play in yhe dsd dsa sad sadsaasd asds asas';

    ctx.beginPath();
    const fondo = await Canvas.loadImage('./public/images/FondoAnime.jpg');
    ctx.drawImage(fondo, 0, 0, _.width, _.height);
    ctx.closePath();

    // ctx.fillStyle = '#FFFFFF';
    // ctx.font = `${20}px MPLUS`

    // ctx.fillText(text, 15, 440, 370);
    resizer(ctx, text,{
        y: 440,
        x: 15,
        width: 370,
        rows: 10,
        textSize: 18
    });

    const buffer = _.toBuffer();
    fs.writeFileSync('./imagetest.png', buffer);
}
test();