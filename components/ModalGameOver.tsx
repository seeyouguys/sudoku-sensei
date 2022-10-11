import React, {FC} from 'react';
import {StyleSheet, Text} from 'react-native';
import {COLORS} from '../utils/constants';
import Button from './button';
import ModalBase from './ModalBase';

type GameStatsObj = {
  time: string;
  difficulty: string;
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

  const comment = 'ПРОЙДИ 3 РАЗА\nЗА 1:00 ЧТОБЫ\nОТКРЫТЬ СЛОЖНОСТЬ\n“МУДРЕЦ”';

  return (
    <ModalBase style={style} headerText={headerText}>
      <Text style={styles.text}>{gameStats.time}</Text>
      <Text style={styles.text}>{gameStats.difficulty}</Text>
      <Text style={[styles.text, styles.textDimmed]}>{comment}</Text>
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
