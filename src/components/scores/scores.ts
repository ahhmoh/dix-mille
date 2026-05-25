export interface Score {
  value: number;
  misses: number;
  isCanceled: boolean;
}

export const isScore = (object: any): object is Score => {
  return 'value' in object && 'misses' in object;
};
