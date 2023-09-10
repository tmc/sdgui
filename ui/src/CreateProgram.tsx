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

const observeProgramSubscription = graphql(`
subscription Subscription($observeProgramId: ID!) {
  observeProgram(id: $observeProgramId) {
    id
    description
    generationStatus
    generationStatusDetails
    files {
      path
      rationale
      generationStatus
      content
    }
    sharedDependencies {
      name
      description
      symbols {
        key
        value
      }
    }
  }
}`);


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

  const [subscriptionData, setSubscriptionData] = useState(null);
  const [filesPaths, setFilePaths] = useState([]);

  const subinfo = useSubscription(observeProgramSubscription, {
    variables: {
      observeProgramId: data?.createProgram?.id || '0',
    },
    onError: (err) => {
      console.error(err)
    },
    onData: (data) => {
      setSubscriptionData(data.data.data?.observeProgram);
    },
  });
  console.log(subinfo)

  // use tailwind to render a basic input box and a text box below it that shows results.
  return (
    <div style={{fontSize: 'small'}}>
      <pre>
        loading: {loading ? 'true' : 'false'}<br/>
      </pre>
      <input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)}
        style={{width: '600px', height: '30px'}}
      />
      <br/>
      <button onClick={() => createProgram()}>Create Program</button>
      <br/>
      <textarea readOnly value={JSON.stringify(data)} style={{width: '800px', height: '120px'}} />
      <br/>
      <textarea readOnly value={JSON.stringify(subscriptionData)} style={{width: '800px', height: '220px'}} />
      <br/>
      <textarea readOnly value={JSON.stringify(subscriptionData?.files)} style={{width: '800px', height: '620px'}} />
    </div>

  );
}

export default CreateProgram;
