export default {
    Server: {
        url: 'http://localhost:8080',
        endPoits: {
            logIn: "/auth/discord"
        }
    },
    Discord: {
        clientID: '879945146869899294',
        Auth: 'https://discord.com/api/oauth2/authorize?client_id=879945146869899294&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fdiscord&response_type=code&scope=identify%20email%20guilds%20guilds.join%20guilds.members.read',
        Invite: 'https://discord.com/api/oauth2/authorize?client_id=879945146869899294&permissions=8&scope=bot'
    },
    Links: {
        homePath: '/',
        loginPath: '/login'
    }
}