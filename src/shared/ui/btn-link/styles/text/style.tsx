import { mergeStylesWithModifiers } from 'shared/lib/modifiers';
import type { TCreateStyle } from '..';
import styles from './scss/btn-link.module.scss';

export type TTextStyleModifiers = { size: 's' | 'm'; icon?: 'arrow' };

const modifiers = {
  size: {
    targetClass: 'btn-link',
    value: {
      s: 'btn-link_size_s',
      m: 'btn-link_size_m',
    },
  },
  icon: {
    targetClass: 'btn-link',
    value: {
      arrow: ['btn-link_icon_', 'btn-link_icon_arrow'],
    },
  },
};

const createTextStyle: TCreateStyle = (chosenModifiers) =>
  mergeStylesWithModifiers(styles, modifiers, chosenModifiers);

export default createTextStyle;
