import React from 'react';
import { useState } from 'react';
import { useSubscription, useMutation } from '@apollo/client'
import './App.css';
import { graphql } from '../src/gql-gen'

const createProgramMutation = graphql(`
mutation CreateProgram($description: String!) {
  createProgram(description: $description) {
    id
    description
  }
}
`)

function CreateProgram() {
  // we'll run/restart the subscription when the prompt changes (with a debounce).
  const [prompt, setPrompt] = useState("write a a program to print hello world in python");
  // result accumulator:
  const [result, setResult] = useState("");

  const [createProgram, { data, loading, error }]= useMutation(createProgramMutation, {
    variables: {
      description: prompt,
    },
  })
  console.log('data', data, 'loading', loading, 'error', error);

  // use tailwind to render a basic input box and a text box below it that shows results.
  return (
    <div style={{fontSize: 'small'}}>
      <pre>
        loading: {loading ? 'true' : 'false'}<br/>
      </pre>
      <input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)}
        style={{width: '400px', height: '30px'}}
      />
      <button onClick={() => createProgram()}>Create Program</button>
      <br/>
      <textarea readOnly value={JSON.stringify(data)} style={{width: '400px', height: '400px'}} />
    </div>

  );
}

export default CreateProgram;
