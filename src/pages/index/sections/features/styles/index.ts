import { mergeStylesWithModifiers } from 'shared/lib/modifiers';
import styles from './scss/features.module.scss';

export type TSimpleStyleModifiers = { style: 'simple'; size: 's' | 'm' };

type TCreateStyle = (chosenModifiers: TSimpleStyleModifiers) => { [k: string]: string };

const modifiers = {
  size: {
    targetClass: 'features',
    value: {
      s: 'features_size_s',
      m: 'features_size_m',
    },
  },
};

const createSimpleStyle: TCreateStyle = (chosenModifiers) =>
  mergeStylesWithModifiers(styles, modifiers, chosenModifiers);

export default createSimpleStyle;
