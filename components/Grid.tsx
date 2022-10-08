import React, {FC, useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS, SIZE} from '../utils/constants';

type GridProps = {
  gridState: string[][];
  numSelected: string | null;

  trySetNumber: (num: string | null, r: number, c: number) => void;
  initialBoard: string[][];
};
const Grid: FC<GridProps> = ({
  gridState,
  numSelected,
  trySetNumber,
}: GridProps) => {
  return (
    <View style={styles.gridContainer}>
      {gridState.map((row, y) =>
        row.map((sym, x) => (
          <Cell
            sym={sym}
            key={y * 9 + x}
            x={x}
            y={y}
            isHighlighted={sym === numSelected}
            trySetNumber={() => trySetNumber(numSelected, y, x)}
          />
        )),
      )}
    </View>
  );
};

type CellProps = {
  sym: string;
  key: number;
  x: number;
  y: number;
  isHighlighted: boolean;
  trySetNumber: () => void;
};
const Cell: FC<CellProps> = ({
  sym,
  x,
  y,
  trySetNumber,
  isHighlighted,
}: CellProps) => {
  if (sym === '.') {
    sym = '';
  }

  const conditionalStyles = [];
  // рамки чтобы визуально разделять квадраты 3х3
  if (x === 2 || x === 5) {
    conditionalStyles.push(styles.rightBorder);
  }
  if (y === 2 || y === 5) {
    conditionalStyles.push(styles.bottomBorder);
  }

  // подсвечивать цифры, совпадающие с выбранной
  if (isHighlighted) {
    conditionalStyles.push(styles.cellHighlighted);
  }

  const isUserSelectable = sym === '';
  if (isUserSelectable) {
    return (
      <TouchableOpacity
        onPress={trySetNumber}
        style={[styles.cell, ...conditionalStyles]}>
        <Text style={styles.cellText}>{sym}</Text>
      </TouchableOpacity>
    );
  } else {
    return (
      <View style={[styles.cell, ...conditionalStyles]}>
        <Text style={styles.cellText}>{sym}</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  gridContainer: {
    width: '95%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cell: {
    width: (SIZE.MAX_WIDTH * 0.95 - 8) / 9,
    height: (SIZE.MAX_WIDTH * 0.95 - 8) / 9,
    backgroundColor: COLORS.accent20,
    borderWidth: 2,
    borderColor: COLORS.bgDark,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
  },
  cellHighlighted: {
    backgroundColor: COLORS.accent50,
  },
  bottomBorder: {
    marginBottom: 4,
  },
  rightBorder: {
    marginRight: 4,
  },
  cellText: {
    lineHeight: (SIZE.MAX_WIDTH * 0.95) / 9,
    color: COLORS.accent,
    fontSize: 30,
    marginTop: -2,
  },
});

export default Grid;
