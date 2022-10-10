import React, {FC} from 'react';
import {StyleSheet, Text} from 'react-native';
import {COLORS} from '../utils/constants';
import Button from './button';
import ModalBase from './ModalBase';

type Props = {
  style?: object;
};

const ModalSelectLevel: FC<Props> = ({style}) => {
  return (
    <ModalBase style={style} headerText="ВЫБЕРИ СЛОЖНОСТЬ">
      <Button text="УЧЕНИК" />
      <Button text="АДЕПТ" />
      <Button isDisabled text="МАСТЕР" />
      <Button isDisabled text="МУДРЕЦ" />
      <Button isDisabled text="СЕНСЕЙ" />
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
