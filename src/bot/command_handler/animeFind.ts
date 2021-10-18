import Canvas from 'canvas';

import Resizer from './methods/textResizer';

import { Message } from 'discord.js';
import axios from 'axios';

export default async (testTXT: string, message: Message | undefined) => {
    const text: string[] = testTXT.split(' ');

    var searchUrl = 'https://api.jikan.moe/v3/search/anime?q=';
    var nombreAnime = text.splice(2, text.length).join(" ");

    const res = await axios({ method: 'GET', url: searchUrl + nombreAnime }).then(res => { return (<queryResponse>res.data).results[0]});

    console.log(res);

}
interface queryResponse {
    results: animeInf[]
}
interface animeInf {
    mal_id: number;
    url: string;
    image_url: string;
    title: string;
    airing: boolean;
    synopsis: string;
    type: 'TV' | 'OVA' | 'MOVIE' | 'SPECIAL' | 'ONA' | 'MUSIC';
    episodes: number;
    score: number;
    start_date: string;
    end_date: string;
    members: number;
    rated: string;
}
//   if (comando === "anime" ) {
//     var urlBusqueda = "https://api.jikan.moe/v3/search/"
//     var nombreAnime = texto.splice(2, texto.length).join(" ")
//     Fetch(urlBusqueda + "anime?q=" + nombreAnime)
//       .then(res => res.json())
//       .then(inf => {
//         var resultado = inf.results[0]
//         datosAnime(mensaje,
//           resultado.synopsis,
//           resultado.image_url,
//           resultado.type,
//           resultado.title,
//           resultado.episodes,
//           resultado.end_date,
//           resultado.start_date)
//     })
//   }

//   /*            Anime           */
//   async function datosAnime(mensaje, sinop, imagen, tipo, titulo, episodios, fin, inicio) {
//     const embed = new Disc.MessageEmbed()
//     const canvas = Canvas.createCanvas(400, 600)
//     const ctx = canvas.getContext('2d');

//     /*         Fondo            */

//     const fondo = await Canvas.loadImage('./public/FondoAnime.jpg');
//     ctx.drawImage(fondo, 0, 0, canvas.width, canvas.height);

//     /*       Emitiendo?         */

//     var fechaFin = fin ? fin.slice(0, 10).split('-') : undefined
//     var fechaIni = inicio ? inicio.slice(0, 10).split('-') : undefined

//     let hoy = new Date()
//     let ultimaEmision = fin ? new Date(fin) : "SinFin"
//     let primeraEmision = inicio ? new Date(inicio) : "Proximamente"

//     ctx.beginPath()

//     ctx.font = '15px MPLUS'


//     if (primeraEmision >= hoy || !inicio) {
//       ctx.fillStyle = "#33FF36"
//       ctx.fillText("Proximamente", 210, 180)
//     }
//     else if (!fin || ultimaEmision > hoy) {
//       ctx.fillStyle = "#FCBF00"
//       ctx.fillText("No Ha Finalizado", 210, 180)
//     }
//     else if (ultimaEmision < hoy) {
//       ctx.fillStyle = "#FC0000"
//       ctx.fillText("Finalizado", 210, 180)
//     }
//     ctx.closePath()

//     /*          Datos           */

//     ctx.beginPath()

//     ctx.font = '15px MPLUS'
//     ctx.fillStyle = '#FFFFFF'

//     if (fechaIni) {
//       ctx.fillText(`Inicio: ${fechaIni.join('/')}`, 210, 200)
//     }
//     if (fechaFin) {
//       ctx.fillText(`Termina: ${fechaFin.join('/')}`, 210, 220)
//     }
//     ctx.closePath()
//     /*        Episodeos         */
//     ctx.beginPath()
//     ctx.font = '15px MPLUS'
//     ctx.fillStyle = '#FFFFFF'
//     if (episodios === 0) {
//       ctx.fillText(`Episodios: Indefinidos`, 210, 240)
//     } else {
//       ctx.fillText(`Episodios: ${episodios}`, 210, 240)
//     }

//     ctx.closePath()
//     /*         imagen           */

//     const portada = await Canvas.loadImage(imagen);
//     ctx.drawImage(portada, 15, 115, 185, 310);

//     /*         Synopsis         */

//     textbox(ctx, sinop, 15, 440, 370, '#FFFFFF', 6, 18)

//     /*         Nomber           */

//     textbox(ctx, titulo, 210, 115, 175, '#FFFFFF', 3, 15)

//     /*         Color            */
//     var coloresP = [
//       { tipo: 'TV', color: "#33FF36", tp: "ANIME" },
//       { tipo: 'Special', color: "#FCBF00", tp: "OVA" },
//       { tipo: 'OVA', color: "#FCBF00", tp: "OVA" },
//       { tipo: 'Movie', color: "#FC0000", tp: "PELICULA" },
//       { tipo: 'ONA', color: "#FC00E9", tp: "ONA" }
//     ]

//     const color = coloresP.find(cl => cl.tipo === tipo)
//     ctx.beginPath()
//     ctx.fillStyle = color.color
//     ctx.fillRect(0, 90, 400, 10)

//     ctx.font = '20px MPLUS'
//     ctx.fillText(color.tp, 20, 70)
//     ctx.closePath()


//     /*         Autor            */

//     ctx.beginPath()
//     ctx.arc(200, 60, 50, 0, 2 * Math.PI, false);
//     ctx.clip();
//     ctx.closePath();
//     let perfil_img = await Canvas.loadImage(mensaje.author.displayAvatarURL({ format: "jpg", dynamic: true, size: 1024 }))
//     ctx.drawImage(perfil_img, 150, 10, 100, 100);

//     /*         Enviar           */

//     const attachment = new Disc.MessageAttachment(canvas.toBuffer(), 'Anime.jpg');
//     embed.attachFiles(attachment)
//     embed.setImage('attachment://Anime.jpg')
//     embed.setColor(color.color)
//     mensaje.channel.send(embed)
//   }
