import Canvas from 'canvas';

import Resizer from './methods/textResizer';

import { Message, MessageEmbed, MessageAttachment, ColorResolvable, BufferResolvable } from 'discord.js';
import axios from 'axios';

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
    type: 'TV' | 'OVA' | 'Movie' | 'Special' | 'ONA' | 'Music';
    episodes: number;
    score: number;
    start_date: string | null;
    end_date: string | null;
    members: number;
    rated: string;
}
interface StatusColor {
    color: string & ColorResolvable;
    text: string;
}
var colors: Map<String, StatusColor> = new Map();

colors.set('TV', { color: '#33FF36', text: "ANIME"});
colors.set('Special', { color: '#FCBF00', text: "SPECIAL"});
colors.set('OVA', { color: '#FCBF00', text: "OVA"});
colors.set('Movie', { color: '#FC0000', text: "MOVIE"});
colors.set('ONA', { color: '#FC00E9', text: "ONA"});
colors.set('Music', { color: '#2E86C1', text: "MUSIC"});



export default async (message: Message) => {
    const text = message.content.split(' ');

    var searchUrl = 'https://api.jikan.moe/v3/search/anime?q=';
    var animeName = text.splice(2, text.length).join(" ");

    const res = await axios({ method: 'GET', url: searchUrl + animeName }).then(res => { return (<queryResponse>res.data).results[0] });

    const image = async () => {
        const embed = new MessageEmbed();
        const canvas = Canvas.createCanvas(400, 600);
        const ctx = canvas.getContext('2d');

        /*         Background            */
        ctx.beginPath();
        const background = await Canvas.loadImage('./public/images/FondoAnime.jpg');
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        ctx.closePath();
        /*            Status             */
        ctx.beginPath();
        ctx.font = '15px MPLUS';
        if (res.airing) {
            ctx.fillStyle = "#FCBF00";
            ctx.fillText("Airling", 210, 180)
        } else {
            const today = new Date();
            if (!res.start_date || (new Date(res.start_date) > today)) {
                ctx.fillStyle = "#33FF36";
                ctx.fillText("Coming soon", 210, 180)
            } else {
                ctx.fillStyle = "#FC0000";
                ctx.fillText("Finished", 210, 180)
            }
        }
        ctx.closePath();
        /*             Info              */
        ctx.beginPath();
        ctx.font = '15px MPLUS'
        ctx.fillStyle = '#FFFFFF'

        if (res.start_date) ctx.fillText(`Start: ${res.start_date.slice(0, 10)}`, 210, 200);
        if (res.end_date) ctx.fillText(`End: ${res.end_date.slice(0, 10)}`, 210, 220);
        ctx.closePath();
        /*            Episodes            */
        ctx.beginPath();
        ctx.font = '15px MPLUS';
        ctx.fillStyle = '#FFFFFF';
        if (res.episodes === 0) {
            ctx.fillText(`Episodes: Not yet`, 210, 240)
        } else {
            ctx.fillText(`Episodes: ${res.episodes}`, 210, 240)
        }
        ctx.closePath();
        /*              Image             */
        const img = await Canvas.loadImage(res.image_url);
        ctx.drawImage(img, 15, 115, 185, 310);
        /*            Synopsis             */
        Resizer(ctx, res.synopsis, { x: 15, y: 440, width: 370, rows: 5 });
        /*              Name               */
        Resizer(ctx, res.title, { x: 210, y: 115, width: 175, rows: 3, textSize: 15 });
        /*              Color              */
        ctx.beginPath();
        ctx.fillStyle = colors.get(res.type)?.color || '#FFFFFF';
        ctx.fillRect(0, 90, 400, 10);

        ctx.font = '20px MPLUS';
        ctx.fillText(colors.get(res.type)?.text || 'TV', 20, 70);
        ctx.closePath();
        /*             Author              */
        ctx.beginPath();
        ctx.arc(200, 60, 50, 0, 2 * Math.PI, false);
        ctx.clip();
        let profile = await Canvas.loadImage(message.author.displayAvatarURL({ format: "jpg", dynamic: true, size: 1024 }))
        ctx.drawImage(profile, 150, 10, 100, 100);
        ctx.closePath();

        /*               Send               */
        
        const attachment = new MessageAttachment(<BufferResolvable>canvas.toBuffer(), 'Anime.jpg');
        
        embed.setImage('attachment://Anime.jpg');
        embed.setColor(colors.get(res.type)?.color || <ColorResolvable>'GREEN');
        return {embed: embed, attachment: attachment};
    }
    
    const {embed, attachment} = await image();
    
    message.channel.send({embeds: [embed], files: [attachment]});
}