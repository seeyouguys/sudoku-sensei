import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS} from '../utils/constants';

type Props = {
  text: string;
  isPrimary?: boolean;
  onClick?: () => void;
  isDisabled?: boolean;
};

const Button: FC<Props> = ({text, isPrimary, onClick, isDisabled}) => {
  const style = [];
  const styleText = [styles.text];

  if (isPrimary) {
    style.push(styles.primaryButton);
    styleText.push(styles.textBold);
  }

  if (isDisabled) {
    style.push(styles.disabledButton);
  }

  return (
    <TouchableOpacity onPress={onClick} disabled={isDisabled} style={style}>
      <Text style={styleText}>{text}</Text>
      {isDisabled && <View style={styles.line} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  primaryButton: {
    backgroundColor: COLORS.accent,
    borderRadius: 2,
  },
  disabledButton: {
    opacity: 0.5,
    alignItems: 'center',
  },
  text: {
    color: COLORS.primary,
    padding: 14,
    fontFamily: 'Roboto',
    letterSpacing: 4,
    // fontWeight: 'bold',
    fontSize: 14,
  },
  textBold: {
    fontWeight: 'bold',
    letterSpacing: 3,
  },
  line: {
    width: 170,
    height: 1,
    backgroundColor: COLORS.primary,
    position: 'relative',
    bottom: '50%',
  },
});

export default Button;
