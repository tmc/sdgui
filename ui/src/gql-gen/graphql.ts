/* eslint-disable */
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
  Pending = 'PENDING',
  Running = 'RUNNING'
}

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
  observeProgram: Program;
};


export type SubscriptionObserveProgramArgs = {
  id: Scalars['ID']['input'];
};

export type SymbolMap = {
  __typename?: 'SymbolMap';
  key: Scalars['String']['output'];
  value: Scalars['String']['output'];
};
