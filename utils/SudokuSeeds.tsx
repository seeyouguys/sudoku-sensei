import randomBetween from './randomBetween';

interface Seeds {
  easy: string[][];
  medium: string[];
  hard: string[];
}

// TODO: заполнить уровни сложности новыми сидами
const SEEDS: Seeds = {
  easy: [
    [
      '......7.35.8..4...6.7..3.4..5136.4.98.25.73.13.4.9285..7.2..9.8...4..5.21.3......',
      '249615783538724196617983245751368429892547361364192857475236918986471532123859674',
    ],
  ],
  medium: [
    '98.67.32.6.74..9....19.2..4..5..4.93.........27.5..8..1..3.74....8..61.5.39.48.72',
  ],
  hard: [
    '98.67.32.6.74..9....19.2..4..5..4.93.........27.5..8..1..3.74....8..61.5.39.48.72',
  ],
};

// Преобразовать строку в матрицу 9х9
const matrixFromSeed = (seed: string): string[][] => {
  const matrix = [];
  const seedArray = seed.split('');

  for (let y = 0; y < 9; y++) {
    matrix[y] = seedArray.splice(0, 9);
  }

  return matrix;
};

// Взять случайный сид, модифицировать его и вернуть
type Level = 'easy' | 'medium' | 'hard';
export const getRandomBoard = (level: Level): string[][][] => {
  const seedIdx: number = randomBetween(0, SEEDS[level].length - 1);
  const [seed, solution] = SEEDS[level][seedIdx];
  // ...
  // TODO: добавить модификации перед возвращением
  // ...

  return [matrixFromSeed(seed), matrixFromSeed(solution)];
};
