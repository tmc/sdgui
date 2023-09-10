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

export type Dependency = {
  __typename?: 'Dependency';
  description: Scalars['String']['output'];
  name: Scalars['String']['output'];
  symbols: Array<SymbolMap>;
};

export type File = {
  __typename?: 'File';
  content: Scalars['String']['output'];
  generationStatus: GenerationStatus;
  path: Scalars['String']['output'];
  rationale: Scalars['String']['output'];
};

export enum GenerationStatus {
  Failed = 'FAILED',
  Finished = 'FINISHED',
  Idle = 'IDLE',
  Pending = 'PENDING',
  Running = 'RUNNING'
}

export type GenericCompletionChunk = {
  __typename?: 'GenericCompletionChunk';
  isLast: Scalars['Boolean']['output'];
  text: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createProgram: Program;
  regenerateProgram: Program;
};


export type MutationCreateProgramArgs = {
  description: Scalars['String']['input'];
};


export type MutationRegenerateProgramArgs = {
  input: RegenerateProgramInput;
};

export type Program = {
  __typename?: 'Program';
  description: Scalars['String']['output'];
  files?: Maybe<Array<File>>;
  generationStatus: GenerationStatus;
  generationStatusDetails?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  sharedDependencies?: Maybe<Array<Dependency>>;
};

export type Query = {
  __typename?: 'Query';
  programs: Array<Program>;
};

export type RegenerateProgramInput = {
  filesToRegenerate: Array<Scalars['ID']['input']>;
  newDescription: Scalars['String']['input'];
};

export type Subscription = {
  __typename?: 'Subscription';
  genericCompletion?: Maybe<GenericCompletionChunk>;
  observeProgram: Program;
  testSubscription: Scalars['String']['output'];
};


export type SubscriptionGenericCompletionArgs = {
  prompt: Scalars['String']['input'];
};


export type SubscriptionObserveProgramArgs = {
  id: Scalars['ID']['input'];
};

export type SymbolMap = {
  __typename?: 'SymbolMap';
  key: Scalars['String']['output'];
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