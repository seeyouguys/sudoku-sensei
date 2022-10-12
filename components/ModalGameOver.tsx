import React, {FC} from 'react';
import {StyleSheet, Text} from 'react-native';
import {COLORS, displayedLevelName} from '../utils/constants';
import {PlayerStats, StatsContext} from '../utils/Contexts';
import Button from './button';
import ModalBase from './ModalBase';

type GameStatsObj = {
  time: string;
  difficulty: Level;
};

type Props = {
  style?: object;
  gameStats: GameStatsObj;
  navigateToMenu: () => void;
};

// Пример использования
// <ModalGameOver gameStats={{time: '1:39', difficulty: 'МАСТЕР'}} />

const ModalGameOver: FC<Props> = ({style, gameStats, navigateToMenu}) => {
  // TODO: менять headerText и comment в зависимости от результата
  const headerText = 'ОТЛИЧНО';

  const makeComment = (stats: PlayerStats): string => {
    const needComment =
      gameStats.difficulty === stats.maxLevel && stats.maxLevel !== 'evil';
    if (needComment) {
      let gamesToLevelUp, nextLevel;

      switch (stats.maxLevel) {
        case 'easy':
          gamesToLevelUp = 3;
          nextLevel = 'МАСТЕР';
          break;
        case 'medium':
          gamesToLevelUp = 5;
          nextLevel = 'МУДРЕЦ';
          break;
        case 'hard':
          gamesToLevelUp = 10;
          nextLevel = 'СЕНСЕЙ';
          break;
      }

      gamesToLevelUp -= stats.winsToLevelUpCounter;

      // Множественная форма слова "раз"
      const times = [2, 3, 4].includes(gamesToLevelUp) ? 'РАЗА' : 'РАЗ';
      return `ПРОЙДИ ЕЩЕ ${gamesToLevelUp} ${times}\n за 10:00, ЧТОБЫ ОТКРЫТЬ СЛОЖНОСТЬ\n${nextLevel}`;
    } else {
      return 'ПРАКТИКА ВЕДЕТ К СОВЕРШЕНСТВУ';
    }
  };

  return (
    <ModalBase style={style} headerText={headerText}>
      <Text style={styles.text}>{gameStats.time}</Text>
      <Text style={styles.text}>
        {displayedLevelName(gameStats.difficulty)}
      </Text>
      <StatsContext.Consumer>
        {stats => (
          <Text style={[styles.text, styles.textDimmed]}>
            {makeComment(stats)}
          </Text>
        )}
      </StatsContext.Consumer>
      <Button isPrimary onClick={navigateToMenu} text={'В МЕНЮ'} />
    </ModalBase>
  );
};

const styles = StyleSheet.create({
  text: {
    color: COLORS.primary,
    fontFamily: 'Roboto',
    letterSpacing: 4,
    fontWeight: 'semibold',
    fontSize: 14,
    padding: 13,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  textDimmed: {
    opacity: 0.5,
  },
});

export default ModalGameOver;
