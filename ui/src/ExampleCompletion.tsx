import React from 'react';
import { useState } from 'react';
import { useSubscription } from '@apollo/client'
import './App.css';
import { graphql } from '../src/gql-gen'

const completionSubscription = graphql(`
  subscription GenericSubscription($prompt: String!) {
    genericCompletion(prompt: $prompt) {
      text
      isLast
    }
}
`)

function ExampleCompletion() {
  // we'll run/restart the subscription when the prompt changes (with a debounce).
  const [prompt, setPrompt] = useState("Tell me about the number 42.");
  const [debouncedPrompt, setDebouncedPrompt] = useState(prompt);
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setResult("");
      setDebouncedPrompt(prompt);
    }, 500);
    return () => clearTimeout(timeout);
  }, [prompt]);

  // result accumulator:
  const [result, setResult] = useState("");

  const { loading } = useSubscription(completionSubscription, {
    variables: {
      prompt: debouncedPrompt,
    },
    onError: (err) => {
      console.error(err)
    },
   onData: (data) => {
     setResult(result + data.data.data?.genericCompletion?.text);
    },
  });

  // use tailwind to render a basic input box and a text box below it that shows results.
  return (
    <div style={{fontSize: 'small'}}>
      <pre>
        loading: {loading ? 'true' : 'false'}<br/>
      </pre>
      <input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)}
        style={{width: '400px', height: '30px'}}
      />
      <br/>
      <textarea readOnly value={result} style={{width: '400px', height: '400px'}} />
    </div>

  );
}

export default ExampleCompletion;
