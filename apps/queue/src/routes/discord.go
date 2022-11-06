package route

import (
	"github.com/Ru-kko/queue-request/src/request"
	"github.com/Ru-kko/queue-request/src/request/discord"
	"github.com/gofiber/fiber/v2"
)

func DiscordRouter(router fiber.Router) {
	tokenRoute := router.Group("/token")
	tokenRoute.Post("/", getToken)
	tokenRoute.Post("/update", updateToken)

	userRoute := router.Group("/user")

	userRoute.Get("/identify", getBassic)
	userRoute.Get("/", getUser)
	userRoute.Get("/guilds", getGuildsFromUser)
	userRoute.Get("/member", getMemeber)

	router.Get("/guild", getGuild)
}

func getToken(c *fiber.Ctx) error {
	code := c.Query("code")

	val, err := discord.GetToken(code)

	if err != nil && err.Status != 0 {
		c.Status(err.Status)
		return c.JSON(err)
	}
	c.Status(200)
	return c.JSON(val)
}

func updateToken(c *fiber.Ctx) error {
	refresh := c.Query("refresh")

	val, err := discord.RefreshToken(refresh)

	if err != nil && err.Status != 0 {
		c.Status(err.Status)
		return c.JSON(err)
	}
	c.Status(200)
	return c.JSON(val)
}

func getBassic(c *fiber.Ctx) error {
	Access := c.Request().Header.Peek("access")

	if len(Access) <= 10 {
		c.Status(401)
		return c.JSON(request.Error{
			Message: "invalid credentials",
			Status:  401,
			Error:   "Unauthorized ",
		})
	}

	val, err := discord.Identify(string(Access))

	if err != nil && err.Status != 0 {
		c.Status(err.Status)
		return c.JSON(err)
	}
	c.Status(200)
	return c.JSON(val)
}

func getUser(c *fiber.Ctx) error {
	Access := c.Request().Header.Peek("access")

	if len(Access) <= 10 {
		c.Status(401)
		return c.JSON(request.Error{
			Message: "invalid credentials",
			Status:  401,
			Error:   "Unauthorized ",
		})
	}

	val, err := discord.GetFullUser(string(Access))

	if err != nil && err.Status != 0 {
		c.Status(err.Status)
		return c.JSON(err)
	}
	c.Status(200)
	return c.JSON(val)
}

func getGuildsFromUser(c *fiber.Ctx) error {
	Access := c.Request().Header.Peek("access")

	if len(Access) <= 10 {
		c.Status(401)
		return c.JSON(request.Error{
			Message: "invalid credentials",
			Status:  401,
			Error:   "Unauthorized ",
		})
	}

	val, err := discord.GetUserGuilds(string(Access))

	if err != nil && err.Status != 0 {
		c.Status(err.Status)
		return c.JSON(err)
	}
	c.Status(200)
	return c.JSON(val)
}

func getMemeber(c *fiber.Ctx) error {
	Access, Guild := c.Request().Header.Peek("access"), c.Request().Header.Peek("guildId")

	if len(Access) <= 10 || len(Guild) <= 10 {
		c.Status(401)
		return c.JSON(request.Error{
			Message: "invalid credentials",
			Status:  401,
			Error:   "Unauthorized ",
		})
	}

	val, err := discord.GetMember(string(Access), string(Guild))

	if err != nil && err.Status != 0 {
		c.Status(err.Status)
		return c.JSON(err)
	}
	c.Status(200)
	return c.JSON(val)
}

func getGuild(c *fiber.Ctx) error {
	guildID := c.Query("guild")
	if len([]rune(guildID)) <= 10 {
		c.Status(401)
		return c.JSON(request.Error{
			Message: "invalid credentials",
			Status:  401,
			Error:   "Unauthorized ",
		})
	}

	val, err := discord.GetFullGuild(guildID)

	if err != nil && err.Status != 0 {
		c.Status(err.Status)
		return c.JSON(err)
	}
	c.Status(200)
	return c.JSON(val)
}
