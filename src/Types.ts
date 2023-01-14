export interface IAlgorithmsInfo {
  algorithms: IAlgorithmTimeComplexity[];
}

export interface IAlgorithmTimeComplexity {
  algorithmName: string;
  complexity: string;
}

export interface IAlgorithmCardInfo {
  _id: string;
  name: string;
  photo?: string;
  complexity?: string;
}

export enum Actions {
  SORT,
  COMPARE,
  SWAP,
}

export enum HistoryWorkerActions {
  GETHISTORY,
}

export const AcceptedType = "NUMBER";

export interface ISettings {
  allowAddingItems: boolean;
  displayAlgorithmsDescription: boolean;
}

export interface IHistoryWorkerArgs {
  type: HistoryWorkerActions;
  token: string;
}

export interface IHistoryItem {
  numbers: Number[];
  algorithm: string;
  date: Date;
}

export interface IHistoryItems {
  nums: IHistoryItem[];
}

export interface IResultsState {
  numbers: number[];
  setNumbers: (nums: number[]) => void;
}

export interface ISettingsState {
  settings: ISettings;
  setSettingsOption: (settings: ISettings, clr: string) => void;
  color: string;
}

export interface IAlgorithmInfoState {
  algorithms: IAlgorithmCardInfo[];
  setAlgos: (algos: IAlgorithmCardInfo[]) => void;
}
export interface IUser {
  email: string;
  invalidLogins: number;
  group: string;
}

export interface IOpinion{
  _id:string;
  text:string;
  rating:number;
}