# Divord Bot (Uncompleted)
This is a discord bot with a dashboard using stack 
- Express
- Mysql
- React
- Nodejs

## Config

Frist you will have to create an application [there](https://discord.com/login?redirect_to=%2Fdevelopers%2Fapplications)

In the bot folder, you will create a file named `.env` and write the following to it

```
Data_Base = MYSQL database name
DB_user = MYSQL database user
DB_password = MYSQL database password
discord_token = Discord bot token
discord_client_id = Discord Oauth client id
discord_client_sec = Discord Oauth client secret
discord_api_endpoint = https://discord.com/api/oauth2
PORT = 8080
Session_PSW = An password to encrypt the sessions

```

In the file [`~/web/src/Config/values.config.ts`](https://github.com/Ru-kko/Bot-TS/blob/main/web/src/Config/values.config.ts), you need to fill the child data of `Object.Discord` with your application credentials
