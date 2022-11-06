package request

type TokenRequest struct {
	Access_token  string `json:"access_token"`
	Expires_in    int    `json:"expires_in"`
	Refresh_token string `json:"refresh_token"`
	Scope         string `json:"scope"`
	Token_type    string `json:"token_type"`
}

// writte if is nessesary
type User struct {
}
type FullUser struct {
}

type UserGuilds struct {
}

type FullGuild struct {
}

type Member struct {
}
