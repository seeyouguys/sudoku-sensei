import React, {FC, useEffect, useRef, useState} from 'react';
import * as Animatable from 'react-native-animatable';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {pattern} from '../assets/Images';
import {COLORS, displayedLevelName, SIZE} from '../utils/constants';
import Grid from '../components/Grid';
import {getRandomBoard} from '../utils/SudokuSeeds';
import NumPicker from '../components/NumPicker';
import Timer, {Time} from '../components/Timer';
import ModalGameOver from '../components/ModalGameOver';
import {PlayerStats} from '../utils/Contexts';
import {Level} from '../utils/SudokuSeeds';

const GameScreen: FC = ({navigation, route, setStats}) => {
  const [gridState, setGridState] = useState<string[][]>();
  const [errorsCounter, setErrorsCounter] = useState<number>(0);
  const MAX_ERRORS = useRef(2).current;
  const [solution, setSolution] = useState<string[][]>();
  const [initialBoard, setInitialBoard] = useState<string[][]>();
  const [showGameOver, setShowGameOver] = useState<Boolean>(false);
  const [timerShouldRun, setTimerShouldRun] = useState<boolean>(true);

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
  const [time, setTime] = useState<Time | null>(null);

  // попытаться поставить цифру num в клетку c координатами r-c
  const trySetNumber = (num: string | null, r: number, c: number): void => {
    if (!num) {
      return;
    }
    if (solution[r][c] === num) {
      // если цифра совпала с ответом, поставить цифру в клетку
      setGridState(prevGrid => {
        if (prevGrid) {
          // TODO: это не так делается, просто используй спред-оператор
          const newGrid = prevGrid.map(row => row.slice()); // deep-copy
          newGrid[r][c] = num;
          return newGrid;
        }
      });
      cellsCounter.current[0] -= 1;
      cellsCounter.current[num] += 1;
      checkRemainingNums(num);
    } else {
      // цифра не совпала с ответом
      setErrorsCounter(errorsCounter + 1);
      gridRef.current.shake(300);
      errorsRef.current.tada();
    }
  };

  useEffect(() => {
    if (errorsCounter > MAX_ERRORS) {
      setTimerShouldRun(false);
      setShowGameOver(true);
    }
  }, [errorsCounter]);

  // Посчитать содержимое клеток (сколько изначально единиц, двоек...),
  const countCells = (board: string[][]): number[] => {
    // 0-я цифра — число пустых клеток, 1-я число единиц, 2-я число двоек, и т.д.
    const cellsCounter = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    board.forEach(row => {
      row.forEach(x => {
        x === '.'
          ? (cellsCounter[0] = cellsCounter[0] + 1)
          : (cellsCounter[+x] = cellsCounter[+x] + 1);
      });
    });

    return cellsCounter;
  };

  const cellsCounter = useRef<number[]>([
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  ]);

  // Если какая-то цифра выставлена на поле 9 раз, то убрать ее из списка оставшихся цифр
  const checkRemainingNums = (num: number | string) => {
    if (cellsCounter.current[+num] === 9) {
      setRemainingNums(prev => {
        return prev.filter(x => x !== '' + num);
      });
    }
  };

  useEffect(() => {
    // Когда на поле не осталось пустых клеток — конец игры, победа
    if (cellsCounter.current && cellsCounter.current[0] === 0) {
      setTimerShouldRun(false);
      setShowGameOver(true);

      // time приходит не сразу
      if (time) {
        // Добавить победу в статистику
        const level: Level = route.params.level;

        setStats((prevStats: PlayerStats) => {
          const condition = prevStats.maxLevel === level && time.minutes < 7;
          return {
            ...prevStats,
            [level]: {
              bestTime: '0:00', // TODO: обновлять лучшее время
              wins: prevStats[level].wins + 1,
            },
            winsToLevelUpCounter: condition
              ? prevStats.winsToLevelUpCounter + 1
              : prevStats.winsToLevelUpCounter,
            // maxLevel: 'easy',
          };
        });
      }
    }
  }, [cellsCounter.current[0], time]);

  // Для анимации
  const gridRef = useRef();
  const errorsRef = useRef();

  useEffect(() => {
    // выбрать случайную головоломку и ее решение
    // requestAnimationFrame чтобы анимация перехода на этот экран не лагала
    const longTask = requestAnimationFrame(() => {
      const level = route.params.level;
      const [_initialBoard, _solution] = getRandomBoard(level);

      cellsCounter.current = countCells(_initialBoard);

      setSolution(_solution);
      setInitialBoard(_initialBoard);
      setGridState(_initialBoard);
      gridRef.current.fadeInDown(400);
    });
    return () => cancelAnimationFrame(longTask);
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
            onPress={navigation.goBack}
            style={styles.backButton}
          />
          <Timer
            shouldRun={timerShouldRun}
            passTimeToParent={setTime}
            style={styles.timer}
          />

          <Text style={styles.text}>
            {displayedLevelName(route.params.level)}
          </Text>
        </View>

        {gridState && initialBoard && (
          <Animatable.View useNativeDriver={true} ref={gridRef}>
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

        <Animatable.Text
          useNativeDriver={true}
          ref={errorsRef}
          style={styles.text}>
          ОШИБОК: {errorsCounter}/{MAX_ERRORS}
        </Animatable.Text>
      </ImageBackground>

      {/* TODO: метод toString для Time вместо этого тернарного */}
      {showGameOver && (
        <ModalGameOver
          result={errorsCounter > MAX_ERRORS ? 'lose' : 'win'}
          navigateToMenu={navigation.goBack}
          gameStats={{
            difficulty: route.params.level,
            time: `${time?.minutes}:${
              time?.seconds > 9 ? time?.seconds : '0' + time?.seconds
            }`,
          }}
        />
      )}
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
    padding: 15,
    paddingTop: 10,
    fontFamily: 'Roboto',
    letterSpacing: 4,
    // fontWeight: 'bold',
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
