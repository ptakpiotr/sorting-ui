export interface IAlgorithmsInfo {
  algorithms: IAlgorithmTimeComplexity[];
}

export interface IAlgorithmTimeComplexity {
  algorithmName: string;
  complexity: string;
}

export interface ISortable {
  values: ISortableValue[];
}

export interface ISortableValue {
  value: number;
  state: Actions;
}

export enum Actions {
  SORT,
  COMPARE,
  SWAP,
}
