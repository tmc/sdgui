import React from 'react';
import { useState } from 'react';
import { useSubscription, useMutation } from '@apollo/client'
import './App.css';
import { graphql } from '../src/gql-gen'
import { Button } from "@/components/ui/button"
import { Tree } from './components/Tree.tsx';

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
  const [prompt, setPrompt] = useState("write a simple flask app");
  // result accumulator:
  const [result, setResult] = useState("");

  const [createProgram, { data, loading, error }]= useMutation(createProgramMutation, {
    variables: {
      description: prompt,
    },
  })
  console.log('data', data, 'loading', loading, 'error', error);
  const treeData = [
    { id: "1", name: "Root Node" },
    {
      id: "2",
      name: "Parent Node",
      children: [
        { id: "2.1", name: "Child Node 1" },
        { id: "2.2", name: "Child Node 2" },
        {
          id: "2.3",
          name: "Child Node 3",
          children: [
            { id: "2.3.1", name: "Grandchild Node 1" },
            { id: "2.3.2", name: "Grandchild Node 2" },
          ],
        },
      ],
    },
    { id: "3", name: "Another Root Node" },
  ];
  
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
      <input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)}
        style={{width: '640px', height: '30px'}}
      />
      <Button onClick={() => createProgram()}>Create Program</Button>
      <br/>
      <br/>
      <textarea readOnly value={JSON.stringify(subscriptionData, null, 2)} style={{width: '800px', height: '220px'}} />
      <br/>
      <textarea readOnly value={JSON.stringify(subscriptionData?.files, null, 2)} style={{width: '800px', height: '620px'}} />
      <br/>
      <div style={{width: '300px', height: '400px', border: '1px solid #ccc'}}>
      </div>
    </div>
  );
}

export default CreateProgram;
