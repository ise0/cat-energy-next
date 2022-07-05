import { mergeStylesWithModifiers } from 'shared/lib/modifiers';
import type { TCreateStyle } from '..';
import styles from './scss/text-area.module.scss';

export type TSimpleStyleModifiers = { size: 's' | 'm' };

const modifiers = {
  size: {
    targetClass: 'text-area',
    value: {
      s: 'text-area_size_s',
      m: 'text-area_size_m',
    },
  },
};

const createSimpleStyle: TCreateStyle = (chosenModifiers) =>
  mergeStylesWithModifiers(styles, modifiers, chosenModifiers);

export default createSimpleStyle;
