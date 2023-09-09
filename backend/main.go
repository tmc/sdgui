```go
package main

import (
	"log"
	"net/http"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/tmc/sdgui/backend/graphql"
)

func main() {
	// Setting up the GraphQL server
	srv := handler.NewDefaultServer(graphql.NewExecutableSchema(graphql.Config{Resolvers: &graphql.Resolver{}}))

	http.Handle("/graphql", srv)

	if playgroundEnabled() {
		http.Handle("/", playground.Handler("GraphQL playground", "/graphql"))
		log.Println("connect to http://localhost:8080/ for GraphQL playground")
	}

	log.Fatal(http.ListenAndServe(":8080", nil))
}

func playgroundEnabled() bool {
	// Enable playground in development mode
	return true
}
```