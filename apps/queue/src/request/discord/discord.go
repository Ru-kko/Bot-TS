package discord

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"time"

	"github.com/Ru-kko/queue-request/src/request"
	"golang.org/x/time/rate"
)

const discord_api_url = "https://discord.com/api/v10"

var dc_client = request.NewClient(rate.NewLimiter(rate.Every(time.Second), 50))

func GetToken(code string) (*request.TokenRequest, *request.Error) {
	var result request.TokenRequest
	var err request.Error

	if len([]rune(code)) <= 10 {
		err = request.Error{
			Message: "field code is not aceptable",
			Status:  400,
			Error:   "Bad Request",
		}
		return &result, &err
	}

	DC_CLIENT_ID, DC_SECRET, CLIENT_URL := os.Getenv("DC_CLIENT_ID"), os.Getenv("DC_SECRET"), os.Getenv("CLIENT_URL")

	data := fmt.Sprintf("grant_type=authorization_code&client_id=%s&"+
		"client_secret=%s&redirect_uri=%s&scope=identify,guilds&code=%s",
		DC_CLIENT_ID, DC_SECRET, CLIENT_URL, code)

	reque, _ := http.NewRequest(http.MethodPost, discord_api_url+"/oauth2/token", bytes.NewReader([]byte(data)))
	reque.Header.Add("Content-Type", "application/x-www-form-urlencoded")

	req, _ := dc_client.Do(reque)

	body, _ := ioutil.ReadAll(req.Body)

	if req.StatusCode >= 300 || req.StatusCode < 200 {
		var res request.DiscordError
		json.Unmarshal(body, &res)
		err = request.Error{
			Message: res.Error_description,
			Error:   res.Error,
			Status:  req.StatusCode,
		}
		return &result, &err
	}

	json.Unmarshal(body, &result)

	defer req.Body.Close()
	return &result, &err
}

func Identify(token string) (*request.User, *request.Error) {
	var result request.User
	var err request.Error

	req, _ := http.NewRequest(http.MethodGet, discord_api_url+"/oauth2/@me", nil)
	req.Header.Set("Authorization", "Bearer "+token)

	response, _ := dc_client.Do(req)
	body, _ := ioutil.ReadAll(response.Body)

	if response.StatusCode >= 300 || response.StatusCode < 200 {
		var res request.DiscordError
		json.Unmarshal(body, &res)
		err = request.Error{
			Message: res.Error_description,
			Error:   res.Error,
			Status:  response.StatusCode,
		}
		return &result, &err
	}

	json.Unmarshal(body, &result)
	defer response.Body.Close()
	return &result, &err
}

func RefreshToken(refreshC string) (*request.TokenRequest, *request.Error) {
	var result request.TokenRequest
	var err request.Error

	if len([]rune(refreshC)) <= 10 {
		err = request.Error{
			Message: "field code is not aceptable",
			Status:  400,
			Error:   "Bad Request",
		}
		return &result, &err
	}

	DC_CLIENT_ID, DC_SECRET := os.Getenv("DC_CLIENT_ID"), os.Getenv("DC_SECRET")

	data := fmt.Sprintf("grant_type=refresh_token&client_id=%s&"+
		"client_secret=%s&refresh_token=%s",
		DC_CLIENT_ID, DC_SECRET, refreshC)

	reque, _ := http.NewRequest(http.MethodPost, discord_api_url+"/oauth2/token", bytes.NewReader([]byte(data)))
	req, _ := dc_client.Do(reque)
	body, _ := ioutil.ReadAll(req.Body)

	if req.StatusCode >= 300 || req.StatusCode < 200 {
		var res request.DiscordError
		json.Unmarshal(body, &res)
		err = request.Error{
			Message: res.Error_description,
			Error:   res.Error,
			Status:  req.StatusCode,
		}
		return &result, &err
	}

	json.Unmarshal(body, &result)

	defer req.Body.Close()
	return &result, &err
}

func GetFullUser(token string) (*request.FullUser, *request.Error) {
	var result request.FullUser
	var err request.Error

	req, _ := http.NewRequest(http.MethodGet, discord_api_url+"/users/@me", nil)
	req.Header.Set("Authorization", "Bearer "+token)

	response, _ := dc_client.Do(req)
	body, _ := ioutil.ReadAll(response.Body)

	if response.StatusCode >= 300 || response.StatusCode < 200 {
		var res request.DiscordError
		json.Unmarshal(body, &res)
		err = request.Error{
			Message: res.Error_description,
			Error:   res.Error,
			Status:  response.StatusCode,
		}
		return &result, &err
	}

	json.Unmarshal(body, &result)
	defer response.Body.Close()

	return &result, &err
}

func GetUserGuilds(token string) (*[]request.UserGuilds, *request.Error) {
	var result []request.UserGuilds
	var err request.Error

	req, _ := http.NewRequest(http.MethodGet, discord_api_url+"/users/@me/guilds", nil)
	req.Header.Set("Authorization", "Bearer "+token)

	response, _ := dc_client.Do(req)
	body, _ := ioutil.ReadAll(response.Body)

	if response.StatusCode >= 300 || response.StatusCode < 200 {
		var res request.DiscordError
		json.Unmarshal(body, &res)
		err = request.Error{
			Message: res.Error_description,
			Error:   res.Error,
			Status:  response.StatusCode,
		}
		return &result, &err
	}

	json.Unmarshal(body, &result)
	defer response.Body.Close()

	return &result, &err
}

func GetFullGuild(guildID string) (*request.FullGuild, *request.Error) {
	var result request.FullGuild
	var err request.Error

	req, _ := http.NewRequest(http.MethodGet, discord_api_url+"/guilds/"+guildID, nil)
	req.Header.Set("Authorization", "Bot "+os.Getenv("DC_TOKEN"))

	response, _ := dc_client.Do(req)
	body, _ := ioutil.ReadAll(response.Body)

	if response.StatusCode >= 300 || response.StatusCode < 200 {
		var res request.DiscordError
		json.Unmarshal(body, &res)
		err = request.Error{
			Message: res.Error_description,
			Error:   res.Error,
			Status:  response.StatusCode,
		}
		return &result, &err
	}

	json.Unmarshal(body, &result)
	defer response.Body.Close()

	return &result, &err
}

func GetMember(token string, guildId string) (*request.Member, *request.Error) {
	var result request.Member
	var err request.Error

	req, _ := http.NewRequest(http.MethodGet,
		discord_api_url+"/users/@me/guilds/"+guildId+"/member",
		nil,
	)

	req.Header.Set("Authorization", "Bearer "+token)

	response, _ := dc_client.Do(req)
	body, _ := ioutil.ReadAll(response.Body)

	if response.StatusCode >= 300 || response.StatusCode < 200 {
		var res request.DiscordError
		json.Unmarshal(body, &res)
		err = request.Error{
			Message: res.Error_description,
			Error:   res.Error,
			Status:  response.StatusCode,
		}
		return &result, &err
	}

	json.Unmarshal(body, &result)
	defer response.Body.Close()

	return &result, &err
}
