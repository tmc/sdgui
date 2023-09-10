package graph

import (
	"context"
	"fmt"
	"os"
	"path/filepath"

	"github.com/tmc/sdgui/backend/generator"
	"github.com/tmc/sdgui/backend/graph/model"
)

func newConfig() generator.Config {
	tmpDir := os.TempDir()
	ftgPath := filepath.Join(tmpDir, ".files")
	sdpPath := filepath.Join(tmpDir, ".shared-deps")
	return generator.Config{
		Model:       "gpt-4",
		TargetDir:   tmpDir,
		Concurrency: 2,
		Verbose:     true,
		Debug:       true,

		FilesToGeneratePath: ftgPath,
		SharedDepsPath:      sdpPath,
	}
}

func (r *mutationResolver) createProgram(ctx context.Context, description string) (*model.Program, error) {
	if r.ProgramGenerators == nil {
		r.ProgramGenerators = map[string]*generator.ProgramGenerator{}
	}
	cfg := newConfig()
	cfg.Prompt = description
	pg := generator.NewProgramGenerator(cfg)
	r.ProgramGenerators[pg.Program.ID] = pg

	go func() {
		endState := model.GenerationStatusFinished
		defer func() {
			pg.Program.GenerationStatus = endState
		}()
		if _, err := pg.Begin(); err != nil {
			fmt.Println("error:", err)
			endState = model.GenerationStatusFailed
		}
	}()

	return pg.Program, nil
}
