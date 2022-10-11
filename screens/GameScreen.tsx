import React, {FC, useEffect, useRef, useState} from 'react';
import * as Animatable from 'react-native-animatable';
import {
  Animated,
  Easing,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {pattern} from '../assets/Images';
import {COLORS, SIZE} from '../utils/constants';
import Grid from '../components/Grid';
import {getRandomBoard} from '../utils/SudokuSeeds';
import NumPicker from '../components/NumPicker';
import Timer from '../components/Timer';

const GameScreen: FC = ({navigation, route}) => {
  const [gridState, setGridState] = useState<string[][]>();
  const [errorsCounter, setErrorsCounter] = useState<number>(0);
  const [solution, setSolution] = useState<string[][]>();
  const [initialBoard, setInitialBoard] = useState<string[][]>();

  const [numSelected, setNumSelected] = useState<string | null>(null);
  const [remainingNums, setRemainingNums] = useState<string[]>([
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
  ]);

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
      gridRef.current.shake(300);
      errorsRef.current.tada();
    }
  };

  const gridRef = useRef();
  const errorsRef = useRef();

  useEffect(() => {
    // выбрать случайную головоломку и ее решение
    const level = route.params.level;
    const [_initialBoard, _solution] = getRandomBoard(level);
    setSolution(_solution);
    setInitialBoard(_initialBoard);
    setGridState(_initialBoard);
  }, []);

  return (
    <>
      <ImageBackground
        style={styles.container}
        source={pattern}
        imageStyle={{opacity: 0.5}}
        resizeMode="repeat">
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          />
          <Timer style={styles.timer} />
        </View>

        {gridState && initialBoard && (
          <Animatable.View ref={gridRef}>
            <Grid
              gridState={gridState}
              numSelected={numSelected}
              initialBoard={initialBoard}
              trySetNumber={trySetNumber}
            />
          </Animatable.View>
        )}

        <NumPicker
          remainingNums={remainingNums}
          setNumSelected={setNumSelected}
          numSelected={numSelected}
        />

        <Animatable.Text ref={errorsRef} style={styles.text}>
          ОШИБОК: {errorsCounter}
        </Animatable.Text>
      </ImageBackground>
    </>
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
  header: {
    marginBottom: 'auto',
    width: '100%',
    alignItems: 'center',
  },
  backButton: {
    top: 20,
    left: 30,
    height: 40,
    width: 40,
    alignSelf: 'flex-start',
    position: 'absolute',
    borderLeftWidth: 7,
    borderBottomWidth: 7,
    borderBottomColor: COLORS.primary,
    borderLeftColor: COLORS.primary,
    transform: [{rotate: '45deg'}],
  },
  timer: {
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
