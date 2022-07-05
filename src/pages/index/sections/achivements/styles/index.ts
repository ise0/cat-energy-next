import { mergeStylesWithModifiers } from 'shared/lib/modifiers';
import styles from './scss/achivements.module.scss';

export type TSimpleStyleModifiers = { style: 'simple'; size: 's' | 'm' | 'l' };

type TCreateStyle = (chosenModifiers: TSimpleStyleModifiers) => { [k: string]: string };

const modifiers = {
  size: {
    targetClass: 'achivements',
    value: {
      s: 'achivements_size_s',
      m: 'achivements_size_m',
      l: 'achivements_size_l',
    },
  },
};

const createSimpleStyle: TCreateStyle = (chosenModifiers) =>
  mergeStylesWithModifiers(styles, modifiers, chosenModifiers);

export default createSimpleStyle;
