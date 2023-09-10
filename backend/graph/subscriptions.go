package graph

import (
	"context"
	"fmt"
	"strings"
	"time"

	"github.com/tmc/langchaingo/llms"
	"github.com/tmc/langchaingo/llms/openai"
	"github.com/tmc/langchaingo/schema"
	"github.com/tmc/sdgui/backend/graph/model"
)

func (r *subscriptionResolver) observeProgram(ctx context.Context, id string) (<-chan *model.Program, error) {
	pg, ok := r.ProgramGenerators[id]
	if !ok {
		return nil, fmt.Errorf("unknown program id: %v", id)
	}
	ch := make(chan *model.Program, 1)
	go func() {
		defer close(ch)
		for {
			select {
			case <-ctx.Done():
				return
			case <-time.After(1 * time.Second):
				ch <- pg.Program
			}
		}
	}()
	return ch, nil
}

func (r *subscriptionResolver) genericCompletion(ctx context.Context, prompt string) (<-chan *model.GenericCompletionChunk, error) {
	llm, err := openai.NewChat()
	if err != nil {
		fmt.Println("Error creating openai client", err)
		return r.fakeGenericCompletion(ctx, prompt)
	}
	ch := make(chan *model.GenericCompletionChunk, 1)
	go func() {
		defer close(ch)
		_, err := llm.Call(ctx, []schema.ChatMessage{
			schema.HumanChatMessage{Content: prompt + " (be concise)"},
		}, llms.WithStreamingFunc(func(ctx context.Context, chunk []byte) error {
			ch <- &model.GenericCompletionChunk{
				Text: string(chunk),
			}
			return nil
		}),
		)
		if err != nil {
			fmt.Println(err)
		}
		ch <- &model.GenericCompletionChunk{
			Text:   "",
			IsLast: true,
		}
	}()
	return ch, nil
}

func (r *subscriptionResolver) fakeGenericCompletion(ctx context.Context, prompt string) (<-chan *model.GenericCompletionChunk, error) {
	ch := make(chan *model.GenericCompletionChunk, 1)
	response := "Hello! These are generated from the go backend. This is not a very funny joke"
	go func() {
		for i, word := range strings.Split(response, " ") {
			isLast := i == len(response)-1
			text := fmt.Sprintf("%v ", word)
			if isLast {
				text = word
			}
			select {
			case ch <- &model.GenericCompletionChunk{
				Text:   text,
				IsLast: isLast,
			}:
			default:
				return
			}
			time.Sleep(200 * time.Millisecond)
		}
	}()
	return ch, nil
}
