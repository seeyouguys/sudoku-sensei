import React, {FC} from 'react';
import {StyleSheet, Text} from 'react-native';
import {COLORS} from '../utils/constants';
import {Level} from '../utils/SudokuSeeds';
import Button from './button';
import ModalBase from './ModalBase';

type Props = {
  style?: object;
  startGame: (level: Level) => void;
};

const ModalSelectLevel: FC<Props> = ({style, startGame}) => {
  return (
    <ModalBase style={style} headerText="ВЫБЕРИ СЛОЖНОСТЬ">
      <Button onClick={() => startGame('easy')} text="УЧЕНИК" />
      {/* <Button onClick={() => startGame('easy')} text="АДЕПТ" /> */}
      <Button onClick={() => startGame('medium')} isDisabled text="МАСТЕР" />
      <Button onClick={() => startGame('hard')} isDisabled text="МУДРЕЦ" />
      <Button onClick={() => startGame('evil')} isDisabled text="СЕНСЕЙ" />
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
  },
  textDimmed: {
    opacity: 0.5,
  },
});

export default ModalSelectLevel;
