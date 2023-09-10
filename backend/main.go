package main

import (
	"log"
	"net/http"
	"os"
	"time"

	"github.com/99designs/gqlgen/graphql"
	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/handler/extension"
	"github.com/99designs/gqlgen/graphql/handler/transport"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/gorilla/websocket"
	"github.com/rs/cors"
	"github.com/tmc/sdgui/backend/graph"
)

const defaultPort = "8080"

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}
	router := chi.NewRouter()

	// Middleware setup
	router.Use(
		middleware.RequestID,
		middleware.RealIP,
		middleware.Recoverer,
		middleware.Logger,
	)

	s := graph.NewExecutableSchema(graph.Config{Resolvers: &graph.Resolver{}})
	srv := newServer(s)
	// playgorund:
	router.HandleFunc("/", renderApolloSandbox)
	router.Handle("/graphql", srv)

	cors := cors.New(cors.Options{
		AllowedOrigins: []string{"*"},
		AllowedMethods: []string{"GET", "POST"},
		AllowedHeaders: []string{"*"},
		// ExposedHeaders:   []string{"Link"},
		AllowCredentials: true,
		// Debug:            true,
	})

	log.Printf("Listening on http://localhost:%s", port)

	log.Fatal(http.ListenAndServe(":"+port, cors.Handler(router)))
}

// Largely copied from handler.NewDefaultServer but with relaxed CORS settings.
func newServer(es graphql.ExecutableSchema) *handler.Server {
	srv := handler.New(es)
	srv.AddTransport(&transport.Websocket{
		KeepAlivePingInterval: 10 * time.Second,
		Upgrader: websocket.Upgrader{
			CheckOrigin: func(r *http.Request) bool {
				return true
			},
		},
	})
	srv.AddTransport(transport.Options{})
	srv.AddTransport(transport.GET{})
	srv.AddTransport(transport.POST{})
	srv.AddTransport(transport.MultipartForm{})

	srv.Use(extension.Introspection{})
	return srv
}
