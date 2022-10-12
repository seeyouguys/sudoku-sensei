import {createContext} from 'react';
import {Level} from './utils/SudokuSeeds';

export type LevelStats = {
  bestTime: string;
  wins: number;
};

export type PlayerStats = {
  easy: LevelStats;
  medium: LevelStats;
  hard: LevelStats;
  evil: LevelStats;
  winsToLevelUpCounter: number;
  maxLevel: Level;
};

export const defaultPlayerStats: PlayerStats = {
  easy: {
    bestTime: '0:00',
    wins: 0,
  },
  medium: {
    bestTime: '0:00',
    wins: 0,
  },
  hard: {
    bestTime: '0:00',
    wins: 0,
  },
  evil: {
    bestTime: '0:00',
    wins: 0,
  },
  winsToLevelUpCounter: 0,
  maxLevel: 'easy',
};

export const StatsContext = createContext<PlayerStats>(defaultPlayerStats);
