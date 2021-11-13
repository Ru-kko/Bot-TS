import axios from "axios";
import { Message } from "discord.js";
import { client } from "../bot_runner";
import { application_response } from "./Interfaces/interfaces";

export default async (message:Message) => {
    if (message.member?.voice.channel) {
        const res = await axios({
            method: 'POST',
            url: `https://discord.com/api/v8/channels/${message.member.voice.channel.id}/invites`,
            data: {
                'max_age': 86400,
                'max_uses': 0,
                'target_application_id': '880218394199220334',
                'target_type': 2,
                'temporary': false,
                'validate': null
            },
            headers: {
                'Authorization': `Bot ${client.token}`,
                'Content-Type': 'application/json'
            }
        }).then((res) =>  {return <application_response>res.data});
        
        if (res.error) message.reply('Sorry I could not create the room, try again.');
        if (res.code) message.channel.send(`https://discord.com/invite/${res.code}`);
    }
}