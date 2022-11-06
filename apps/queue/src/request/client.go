package request

import (
	"context"
	"net/http"

	"golang.org/x/time/rate"
)

type RateLimitClient struct {
	client  *http.Client
	limiter *rate.Limiter
}

func (this *RateLimitClient) Do(req *http.Request) (*http.Response, error) {
	ctx := context.Background()

	err := this.limiter.Wait(ctx)

	if err != nil {
		return nil, err
	}

	resp, err := this.client.Do(req)

	if err != nil {
		return nil, err
	}

	return resp, nil
}

func NewClient(rl *rate.Limiter) *RateLimitClient {
	c := &RateLimitClient{
		client:  &http.Client{},
		limiter: rl,
	}

	return c
}
