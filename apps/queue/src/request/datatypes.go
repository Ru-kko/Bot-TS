package request

type TokenRequest struct {
	Access_token  string `json:"access_token"`
	Expires_in    int    `json:"expires_in"`
	Refresh_token string `json:"refresh_token"`
	Scope         string `json:"scope"`
	Token_type    string `json:"token_type"`
}

type User struct {
	Application Application `json:"application"`
	Expires     string      `json:"expires"`
	User        userBase    `json:"user"`
}

type FullUser struct {
	userBase
	Flags        int    `json:"flags"`
	Avatar       string `json:"avatar"`
	Banner_color string `json:"banner_color"`
	Locate       string `json:"locate"`
}

type UserGuilds struct {
	guildBase
	Owner           bool `json:"owner"`
	Permissions     int  `json:"permissions"`
	Permissions_new int  `json:"permissions_new"`
}

type FullGuild struct {
	guildBase
	Owner_id    string `json:"owner_id"`
	Description string `json:"description"`
	Roles       []role `json:"roles"`
}

type Member struct {
	Roles []string `json:"roles"`
	User  userBase `json:"user"`
}

// Base
type userBase struct {
	Id            string `json:"id"`
	Username      string `json:"username"`
	Avatar        string `json:"avatar"`
	Discriminator string `json:"discriminator"`
	Pubic_flags   string `json:"public_flags"`
}

type guildBase struct {
	Id       string   `json:"id"`
	Name     string   `json:"name"`
	Icon     string   `json:"icon"`
	Features []string `json:"features"`
}
type Install_params struct {
	Scopes      []string `json:"scopes"`
	Permissions int      `json:"permissions"`
}
type Application struct {
	Id                     string         `json:"id"`
	Name                   string         `json:"name"`
	Icon                   string         `json:"icon"`
	Description            string         `json:"description"`
	Bot_public             bool           `json:"bot_public"`
	Bot_require_code_grant bool           `json:"bot_require_code_gran"`
	Summary                string         `json:"summary"`
	Verify_key             string         `json:"verify_key"`
	Install_params         Install_params `json:"install_params"`
}

type role struct {
	Id          string `json:"id"`
	Name        string `json:"name"`
	Permissions int    `json:"permissions"`
	Position    int    `json:"position"`
}
