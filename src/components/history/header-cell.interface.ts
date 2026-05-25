export interface HeaderCell {
  headerValue: string;
}

export const isHeaderCell = (object: any): object is HeaderCell => {
  return 'headerValue' in object;
};
