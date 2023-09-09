```go
package graphql

import (
    "github.com/99designs/gqlgen/graphql/handler"
    "github.com/99designs/gqlgen/graphql/playground"
    "github.com/gin-gonic/gin"
    "github.com/tmc/sdgui/backend/graphql/generated"
    "github.com/tmc/sdgui/backend/graphql/resolvers"
)

func GraphqlHandler() gin.HandlerFunc {
    h := handler.NewDefaultServer(generated.NewExecutableSchema(generated.Config{Resolvers: &resolvers.Resolver{}}))

    return func(c *gin.Context) {
        h.ServeHTTP(c.Writer, c.Request)
    }
}

func PlaygroundHandler() gin.HandlerFunc {
    h := playground.Handler("graphql", "/graphql")

    return func(c *gin.Context) {
        h.ServeHTTP(c.Writer, c.Request)
    }
}
```