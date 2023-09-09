```go
package graphql

import (
	"context"

	"github.com/tmc/sdgui/backend/graphql/generated"
)

// Resolver struct acts as the receiver for the mutation and query resolvers.
type Resolver struct{} 

func (r *Resolver) Mutation() generated.MutationResolver {
	return &mutationResolver{r}
}

type mutationResolver struct{ *Resolver }

func (r *mutationResolver) CreateProgram(ctx context.Context, description string) (*generated.Program, error) {
	panic("not implemented")
}

func (r *mutationResolver) RegenerateProgram(ctx context.Context, input generated.RegenerateProgramInput) (*generated.Program, error) {
	panic("not implemented")
}

func (r *Resolver) Subscription() generated.SubscriptionResolver {
	return &subscriptionResolver{r}
}

type subscriptionResolver struct{ *Resolver }

func (r * Resolver) ObserveProgram(ctx context.Context, id string) (<-chan *generated.Program, error) {
	panic("not implemented")
}

func (r *Resolver) Program() generated.ProgramResolver {
	return &programResolver{r}
}

type programResolver struct{ *Resolver }
```