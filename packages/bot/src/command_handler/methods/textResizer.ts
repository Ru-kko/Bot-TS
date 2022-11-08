import { CanvasRenderingContext2D as context } from "canvas";
import type { textBoxOptions } from "@bot/types";

export default (ctx: context, text: string, options: textBoxOptions) => {
  ctx.beginPath();
  var words = text.split(" ");
  var size = options.textSize || 18;

  ctx.fillStyle = options.color || "#FFFFFF";
  ctx.font = `${size}px "Mplus 1p Blod"`;

  for (var i = 0; i < options.rows; i++) {
    var txt = words.slice();

    while (ctx.measureText(txt.join(" ")).width > options.width) {
      txt.pop();
    }
    ctx.fillText(txt.join(" "), options.x, size * i + options.y + 2 * size);

    txt = words.splice(0, txt.length);
    if (!txt[0]) {
      break;
    }
  }
  ctx.closePath();
};
