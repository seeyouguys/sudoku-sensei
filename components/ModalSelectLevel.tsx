import React, {FC} from 'react';
import {StatsContext} from '../utils/Contexts';
import {Level} from '../utils/SudokuSeeds';
import Button from './button';
import ModalBase from './ModalBase';

type Props = {
  style?: object;
  startGame: (level: Level) => void;
};

const ModalSelectLevel: FC<Props> = ({style, startGame}) => {
  return (
    <StatsContext.Consumer>
      {stats => {
        /* eslint-disable no-fallthrough */
        const availableLevels = ['easy'];
        switch (stats.maxLevel) {
          case 'evil':
            availableLevels.push('evil');
          case 'hard':
            availableLevels.push('hard');
          case 'medium':
            availableLevels.push('medium');
        }
        return (
          <ModalBase style={style} headerText="ВЫБЕРИ СЛОЖНОСТЬ">
            <Button onClick={() => startGame('easy')} text="УЧЕНИК" />
            <Button
              onClick={() => startGame('medium')}
              isDisabled={!availableLevels.includes('medium')}
              text="МАСТЕР"
            />
            <Button
              onClick={() => startGame('hard')}
              isDisabled={!availableLevels.includes('hard')}
              text="МУДРЕЦ"
            />
            <Button
              onClick={() => startGame('evil')}
              isDisabled={!availableLevels.includes('evil')}
              text="СЕНСЕЙ"
            />
          </ModalBase>
        );
      }}
    </StatsContext.Consumer>
  );
};

export default ModalSelectLevel;
