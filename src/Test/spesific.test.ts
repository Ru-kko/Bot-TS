import Canvas from "canvas";
import resizer from "../bot/command_handler/methods/textResizer";
Canvas.registerFont('../../../public/MPLUS1p-Black.ttf', { family: 'MPLUS' })

function test() {
    const _ = Canvas.createCanvas(400, 600);
    const ctx = _.getContext('2d');

    const text = 'the cat is in the bed while he is slepping i play in yhe dsd dsa sad sadsaasd asds asas';

    resizer(ctx, text,{
        y: 1,
        x: 2,
        width: 100,
        rows: 3,
    });
}