export interface IAlgorithmsInfo {
  algorithms: IAlgorithmTimeComplexity[];
}

export interface IAlgorithmTimeComplexity {
  algorithmName: string;
  complexity: string;
}

export enum Actions {
  SORT,
  COMPARE,
  SWAP,
}

export const AcceptedType = "NUMBER";

export interface ISettings {
  allowAddingItems: boolean;
  displayAlgorithmsDescription: boolean;
}
