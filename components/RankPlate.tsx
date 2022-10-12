import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS, displayedLevelName} from '../utils/constants';
import {StatsContext} from '../utils/Contexts';
type Props = {
  style?: object;
};

const RankPlate: FC<Props> = ({style}) => {
  return (
    <View style={[style]}>
      <Text style={[styles.text, styles.row1]}>РАНГ:</Text>
      <StatsContext.Consumer>
        {stats => (
          <Text style={[styles.text, styles.row2]}>
            {displayedLevelName(stats.maxLevel)}
          </Text>
        )}
      </StatsContext.Consumer>
    </View>
  );
};

const styles = StyleSheet.create({
  row1: {
    fontWeight: 'normal', // TODO: light
    color: COLORS.bgDark,
  },
  row2: {
    fontWeight: 'bold',
    color: COLORS.primary,
    backgroundColor: COLORS.bgDark,
    borderRadius: 1,
    paddingRight: 10,
  },
  text: {
    fontFamily: 'Roboto',
    letterSpacing: 3,
    fontSize: 14,
    paddingLeft: 15,
  },
});

export default RankPlate;
