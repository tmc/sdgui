package main

import (
	"log"
	"net/http"
	"os"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
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

	srv := handler.NewDefaultServer(graph.NewExecutableSchema(graph.Config{Resolvers: &graph.Resolver{}}))
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
