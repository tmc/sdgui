package graph

import "github.com/tmc/sdgui/backend/generator"

type Resolver struct {
	ProgramGenerators map[string]*generator.ProgramGenerator
}
