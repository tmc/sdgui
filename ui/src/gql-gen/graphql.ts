/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

/** Represents a dependency required by a program. */
export type Dependency = {
  __typename?: 'Dependency';
  /** Brief description of the dependency. */
  description: Scalars['String']['output'];
  /** Name of the dependency. */
  name: Scalars['String']['output'];
  /** Rationale or purpose for needing the dependency. */
  rationale: Scalars['String']['output'];
  /** Map of symbols related to this dependency. */
  symbols: Array<SymbolMap>;
};

/** Represents a file in a program. */
export type File = {
  __typename?: 'File';
  /** Content of the file. */
  content: Scalars['String']['output'];
  /** Current status of the file's generation process. */
  generationStatus: GenerationStatus;
  /** Additional details about the generation status. */
  generationStatusDetails?: Maybe<Scalars['String']['output']>;
  /** Path to the file. */
  path: Scalars['String']['output'];
  /** Rationale or purpose of the file. */
  rationale: Scalars['String']['output'];
};

/** Enumeration of possible generation statuses. */
export enum GenerationStatus {
  Failed = 'FAILED',
  Finished = 'FINISHED',
  Idle = 'IDLE',
  Pending = 'PENDING',
  Running = 'RUNNING'
}

/** Represents a chunk of generic completion text. */
export type GenericCompletionChunk = {
  __typename?: 'GenericCompletionChunk';
  /** Flag indicating if this is the last chunk. */
  isLast: Scalars['Boolean']['output'];
  /** The text content of the chunk. */
  text: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Create a new program with a given description. */
  createProgram: Program;
  /** Regenerate an existing program based on input. */
  regenerateProgram: Program;
};


export type MutationCreateProgramArgs = {
  description: Scalars['String']['input'];
};


export type MutationRegenerateProgramArgs = {
  input: RegenerateProgramInput;
};

/** Represents a program in the system. */
export type Program = {
  __typename?: 'Program';
  /** Brief description of the program. */
  description: Scalars['String']['output'];
  /** List of files associated with the program. */
  files?: Maybe<Array<File>>;
  /** Current status of the program's generation process. */
  generationStatus: GenerationStatus;
  /** Additional details about the generation status. */
  generationStatusDetails?: Maybe<Scalars['String']['output']>;
  /** Unique identifier for the program. */
  id: Scalars['ID']['output'];
  /** Shared dependencies across files in the program. */
  sharedDependencies?: Maybe<Array<Dependency>>;
};

/** Main schema for the Supervised Program Synthesis system. */
export type Query = {
  __typename?: 'Query';
  /** List of all programs available. */
  programs: Array<Program>;
};

/** Input type for regenerating a program. */
export type RegenerateProgramInput = {
  /** IDs of the files to be regenerated. */
  filesToRegenerate: Array<Scalars['ID']['input']>;
  /** New description for the program. */
  newDescription: Scalars['String']['input'];
};

export type Subscription = {
  __typename?: 'Subscription';
  /** Get chunks of generic completion based on a given prompt. */
  genericCompletion?: Maybe<GenericCompletionChunk>;
  /** Observe changes to a specific program by its ID. */
  observeProgram: Program;
  /** Test the subscription feature (used mainly for debugging). */
  testSubscription: Scalars['String']['output'];
};


export type SubscriptionGenericCompletionArgs = {
  prompt: Scalars['String']['input'];
};


export type SubscriptionObserveProgramArgs = {
  id: Scalars['ID']['input'];
};

/** Represents a key-value mapping of symbols. */
export type SymbolMap = {
  __typename?: 'SymbolMap';
  /** Key of the symbol. */
  key: Scalars['String']['output'];
  /** Value of the symbol. */
  value: Scalars['String']['output'];
};

export type CreateProgramMutationVariables = Exact<{
  description: Scalars['String']['input'];
}>;


export type CreateProgramMutation = { __typename?: 'Mutation', createProgram: { __typename?: 'Program', id: string, description: string } };

export type SubscriptionSubscriptionVariables = Exact<{
  observeProgramId: Scalars['ID']['input'];
}>;


export type SubscriptionSubscription = { __typename?: 'Subscription', observeProgram: { __typename?: 'Program', id: string, description: string, generationStatus: GenerationStatus, generationStatusDetails?: string | null, files?: Array<{ __typename?: 'File', path: string, rationale: string, generationStatus: GenerationStatus, content: string }> | null, sharedDependencies?: Array<{ __typename?: 'Dependency', name: string, description: string, symbols: Array<{ __typename?: 'SymbolMap', key: string, value: string }> }> | null } };

export type GenericSubscriptionSubscriptionVariables = Exact<{
  prompt: Scalars['String']['input'];
}>;


export type GenericSubscriptionSubscription = { __typename?: 'Subscription', genericCompletion?: { __typename?: 'GenericCompletionChunk', text: string, isLast: boolean } | null };


export const CreateProgramDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateProgram"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createProgram"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<CreateProgramMutation, CreateProgramMutationVariables>;
export const SubscriptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"Subscription"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"observeProgramId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"observeProgram"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"observeProgramId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"generationStatus"}},{"kind":"Field","name":{"kind":"Name","value":"generationStatusDetails"}},{"kind":"Field","name":{"kind":"Name","value":"files"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"rationale"}},{"kind":"Field","name":{"kind":"Name","value":"generationStatus"}},{"kind":"Field","name":{"kind":"Name","value":"content"}}]}},{"kind":"Field","name":{"kind":"Name","value":"sharedDependencies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"symbols"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]}}]}}]} as unknown as DocumentNode<SubscriptionSubscription, SubscriptionSubscriptionVariables>;
export const GenericSubscriptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"GenericSubscription"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"prompt"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"genericCompletion"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"prompt"},"value":{"kind":"Variable","name":{"kind":"Name","value":"prompt"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"isLast"}}]}}]}}]} as unknown as DocumentNode<GenericSubscriptionSubscription, GenericSubscriptionSubscriptionVariables>;