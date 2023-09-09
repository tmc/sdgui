```go
package graphql

import (
	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/gorilla/mux"
	"github.com/tmc/sdgui/backend/graphql/generated"
	"github.com/tmc/sdgui/backend/graphql/resolvers"
	"net/http"
)

func RunServer() {
	router := mux.NewRouter()
	srv := handler.NewDefaultServer(generated.NewExecutableSchema(generated.Config{Resolvers: &resolvers.Resolver{}}))

	router.Handle("/graphql", srv)
	router.Handle("/", playground.Handler("GraphQL playground", "/graphql"))

	http.ListenAndServe(":8080", router)
}
```