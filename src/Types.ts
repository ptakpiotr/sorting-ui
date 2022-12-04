export interface IAlgorithmsInfo {
  algorithms: IAlgorithmTimeComplexity[];
}

export interface IAlgorithmTimeComplexity {
  algorithmName: string;
  complexity: string;
}

export interface ISettings {
  defaultDrop: number;
  defaultColor: string;
}

export enum Actions {
  SORT,
  COMPARE,
  SWAP,
}

export const AcceptedType = "NUMBER";
