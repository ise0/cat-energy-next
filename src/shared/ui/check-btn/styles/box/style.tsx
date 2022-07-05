import { mergeStylesWithModifiers } from 'shared/lib/modifiers';
import type { TCreateStyle } from '..';
import styles from './scss/check-btn.module.scss';

export type TBoxStyleModifiers = { size: 's' | 'm' };

const modifiers = {
  size: {
    targetClass: 'check-btn',
    value: {
      s: 'check-btn_size_s',
      m: 'check-btn_size_m',
    },
  },
};

const createBoxStyle: TCreateStyle = (chosenModifiers) =>
  mergeStylesWithModifiers(styles, modifiers, chosenModifiers);

export default createBoxStyle;
