.PHONY: run-dev
run-dev: deps
	@go run github.com/tmc/wgo@latest run .

.PHONY: generate
generate:
	go generate

deps:
	@command -v go > /dev/null || brew install go

