import { mergeStylesWithModifiers } from 'shared/lib/modifiers';
import type { TCreateStyle } from '..';
import styles from './scss/btn-link.module.scss';

export type TSimpleStyleModifiers = { size: 's' | 'm'; theme: 'green' | 'gray'; shape?: 'oval' };

const modifiers = {
  size: {
    targetClass: 'btn-link',
    value: {
      s: 'btn-link_size_s',
      m: 'btn-link_size_m',
    },
  },
  theme: {
    targetClass: 'btn-link',
    value: {
      green: 'btn-link_theme_green',
      gray: 'btn-link_theme_gray',
    },
  },
  shape: {
    targetClass: 'btn-link',
    value: {
      oval: 'btn-link_shape_oval',
    },
  },
};

const createSimpleStyle: TCreateStyle = (chosenModifiers) =>
  mergeStylesWithModifiers(styles, modifiers, chosenModifiers);

export default createSimpleStyle;
