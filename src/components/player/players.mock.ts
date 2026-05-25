import { Player } from './player';

export const playersMock: Player[] = [
  { name: 'ant', scores: [], turnCount: 0 },
  { name: 'apo', scores: [], turnCount: 0 },
  { name: 'oro', scores: [], turnCount: 0 },
];

export const mockSinglePlayer = {
  name: 'name',
  scores: [
    { value: 100, misses: 0 },
    { value: 200, misses: 0 },
    { value: 300, misses: 0 },
    { value: 400, misses: 0 },
    { value: 500, misses: 0 },
    { value: 600, misses: 0 },
    { value: 700, misses: 0 },
    { value: 800, misses: 3 },
    { value: 900, misses: 2 },
    { value: 1000, misses: 0 },
    { value: 1100, misses: 0 },
    { value: 10100, misses: 2 },
  ],
  turnCount: 0,
};
