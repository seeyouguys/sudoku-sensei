import randomBetween from './randomBetween';

interface Seeds {
  easy: string[][];
  medium: string[];
  hard: string[];
  evil: string[];
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
  evil: [
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

// // Перемешать переданные строки между друг другом
// const shuffleRows = (rows: string[][]): string[][] => {
//   return rows.sort(() => Math.random() - 0.5);
// };

// // Валидно только перемешивание в рамках трех строк (1-3, 4-6, 7-9)
// const shuffleMatrix = (matrix: string[][]): string[][] => {
//   return [
//     shuffleRows(matrix.slice(0, 3)),
//     shuffleRows(matrix.slice(3, 6)),
//     shuffleRows(matrix.slice(6)),
//   ].flat();
// };

// Поворот матрицы
const rotateMatrix = (matrix: string[][]): string[][] => {
  const n = matrix.length;

  // Create a temporary matrix of size n x n
  let t = Array.from(Array(n), () => Array.from(Array(n)));

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      // basically matrix[i][j] gets moved to [j][n - (i + 1)]
      // e.g. matrix[0][0] => matrix[0][8] assuming 9x9 matrix
      let ele = matrix[i][j];
      let idx = n - (i + 1);

      t[j][idx] = ele;
    }
  }
  return t;
};

const applyRandomTransforms = (
  matrix: string[][],
  solution: string[][],
): string[][][] => {
  const choice = Math.random() * 10; // 0...10
  console.log(choice);

  if (choice > 6) {
    return [matrix, solution];
  } else if (choice > 3) {
    return [rotateMatrix(matrix), rotateMatrix(solution)];
  } else {
    return [
      rotateMatrix(rotateMatrix(matrix)),
      rotateMatrix(rotateMatrix(solution)),
    ];
  }
};

// Взять случайный сид, модифицировать его и вернуть
export type Level = 'easy' | 'medium' | 'hard' | 'evil';
export const getRandomBoard = (level: Level): string[][][] => {
  const seedIdx: number = randomBetween(0, SEEDS[level].length - 1);
  const [seed, solution] = SEEDS[level][seedIdx];

  return applyRandomTransforms(matrixFromSeed(seed), matrixFromSeed(solution));
};
