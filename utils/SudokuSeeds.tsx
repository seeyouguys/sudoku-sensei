import randomBetween from './randomBetween';

//TODO: нормально типизировать как matrix вместо string[][]

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
    [
      '...7..6....9.....33.6258.917.25.4...6.13.25.8...9.62.712.8639.44.....3....3..5...',
      '814739625259641873376258491732584169691372548548916237127863954465197382983425716',
    ],
    [
      '6.3..1.2.27...894.9..6........28.754.3..6..9.487.19........4..7.691...83.2.7..5.9',
      '643971825271358946958642371196283754532467198487519632315894267769125483824736519',
    ],
    [
      '6..8.1.5..51.923.4..24..71..26........57.86........23..39..41..8.796.42..6.5.7..3',
      '643871952751692384982435716126349578395728641478156239539284167817963425264517893',
    ],
    [
      '4....2...1.643..5.39.86...4.4.....9.6829.4735.3.....6.2...41.86.1..863.9...2....7',
      '458192673126437958397865214745623891682914735931578462279341586514786329863259147',
    ],
    [
      '8...694.7...5.72....74...9....98.5.42.5.4.7.94.9.56....2...31....86.5...9.127...8',
      '832169457194537286567428391673982514285341769419756823726893145348615972951274638',
    ],
    [
      '.4.9.738.17.2..9.6.9..8...2237...6...1.....3...5...2949...6..2.7.1..5.68.864.2.1.',
      '642917385178253946593684172237849651419526837865731294954168723721395468386472519',
    ],
    [
      '.8...572...5.1.98.97.8.2.538..5....2.6.....3.3....4..564.1.8.97.98.3.5...524...6.',
      '481395726235617984976842153819563472564721839327984615643158297798236541152479368',
    ],
    [
      '..4..296.59.6...2...3.7...194..67.38.........36.21..792...4.7...3...1.86.783..2..',
      '784132965591684327623975841942567138817493652365218479256849713439721586178356294',
    ],
    [
      '63.95..74.7...31....47.6......198.....5...9.....572......4.93....78...1.45..37.98',
      '632951874578243169914786532263198745785364921149572683826419357397825416451637298',
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

// // Предсказуемо перемешать переданные строки между друг другом
const shuffleRows = (num: number, rows: string[][]): string[][] => {
  return rows.sort(() => num - 0.5);
};

// // Валидно только перемешивание в рамках трех строк (1-3, 4-6, 7-9)
const shuffleMatrix = (matrix: string[][], random: number): string[][] => {
  return [
    shuffleRows(random, matrix.slice(0, 3)),
    shuffleRows(random, matrix.slice(3, 6)),
    shuffleRows(random, matrix.slice(6)),
  ].flat();
};

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
  // random позволяет применить одинаковые преобразования для matrix и solution
  const random = Math.random(); // 0.0 ... 1.0
  matrix = shuffleMatrix(matrix, random);
  solution = shuffleMatrix(solution, random);

  if (random > 0.66) {
    return [matrix, solution];
  } else if (random > 0.33) {
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

  console.log(seed);
  console.log(solution);
  return applyRandomTransforms(matrixFromSeed(seed), matrixFromSeed(solution));
};
