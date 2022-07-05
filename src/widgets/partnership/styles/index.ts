import { mergeStylesWithModifiers } from 'shared/lib/modifiers';
import styles from './scss/partnership.module.scss';

export type TSimpleStyleModifiers = { style: 'simple'; size: 's' | 'm' | 'l' };

const modifiers = {
  size: {
    targetClass: 'partnership',
    value: {
      s: 'partnership_size_s',
      m: 'partnership_size_m',
      l: 'partnership_size_l',
    },
  },
};

const createSimpleStyle = (chosenModifiers: TSimpleStyleModifiers) =>
  mergeStylesWithModifiers(styles, modifiers, chosenModifiers);

export default createSimpleStyle;
