import React, {FC, useEffect, useState} from 'react';
import {ImageBackground, StyleSheet, Text} from 'react-native';
import {pattern} from '../assets/Images';
import {COLORS, SIZE} from '../utils/constants';
import Grid from '../components/Grid';
import {getRandomBoard} from '../utils/SudokuSeeds';
import NumPicker from '../components/NumPicker';
import Timer from '../components/Timer';

const GameScreen: FC = () => {
  const [gridState, setGridState] = useState<string[][]>();
  const [errorsCounter, setErrorsCounter] = useState<number>(0);
  const [solution, setSolution] = useState<string[][]>();
  const [initialBoard, setInitialBoard] = useState<string[][]>();

  const [numSelected, setNumSelected] = useState<string | null>(null);

  // попытаться поставить цифру num в клетку c координатами r-c
  const trySetNumber = (num: string | null, r: number, c: number): void => {
    if (!num) {
      return;
    }
    if (solution[r][c] === num) {
      // если цифра совпала с ответом, поставить цифру в клетку
      setGridState(prevGrid => {
        if (prevGrid) {
          const newGrid = prevGrid.map(row => row.slice()); // deep-copy
          newGrid[r][c] = num;
          return newGrid;
        }
      });
    } else {
      // цифра не совпала с ответом
      setErrorsCounter(errorsCounter + 1);
      // TODO: добавить красную вспышку экрана
    }
  };

  // useEffect(() => {
  //   if (gridState) {
  //     console.log('gridState: ');
  //     gridState.forEach(row => console.log(row));
  //   }
  // }, [gridState]);

  useEffect(() => {
    // выбрать случайную головоломку и ее решение
    const [_initialBoard, _solution] = getRandomBoard('easy');
    setSolution(_solution);
    setInitialBoard(_initialBoard);
    setGridState(_initialBoard);
  }, []);

  return (
    <ImageBackground
      style={styles.container}
      source={pattern}
      imageStyle={{opacity: 0.5}}
      resizeMode="repeat">
      <Timer style={styles.timer} />

      {gridState && initialBoard && (
        <Grid
          gridState={gridState}
          numSelected={numSelected}
          initialBoard={initialBoard}
          trySetNumber={trySetNumber}
        />
      )}

      <NumPicker
        remainingNums={['1', '2', '3', '4', '5', '6', '7', '8', '9']}
        setNumSelected={setNumSelected}
        numSelected={numSelected}
      />

      <Text style={styles.text}>ОШИБОК: {errorsCounter}</Text>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: COLORS.bgDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timer: {
    marginBottom: 'auto',
    zIndex: -1,
  },
  text: {
    color: COLORS.primary,
    padding: 25,
    fontFamily: 'Roboto',
    letterSpacing: 4,
    fontWeight: 'semibold',
    fontSize: 14,
  },
  footerButtons: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  bgImage: {
    width: SIZE.MAX_WIDTH,
    height: SIZE.MAX_HEIGHT / 1.5,
    borderWidth: 1,
  },
});

export default GameScreen;
