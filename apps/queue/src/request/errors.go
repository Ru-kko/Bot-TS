package request

type Error struct {
	Error   string `json:"error"`
	Status  int    `json:"status"`
	Message string `json:"message"`
}

type DiscordError struct {
	Error             string `json:"error"`
	Error_description string `json:"error_description"`
}
