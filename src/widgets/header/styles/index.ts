import cn from 'classnames';
import { mergeStylesWithModifiers } from 'shared/lib/modifiers';
import styles from './scss/header.module.scss';

type TExtraModifiers = { logoSize: 's' | 'm' | 'l' };

export type TSimpleStyleModifiers = { style: 'simple'; size: 's' | 'm' | 'l'; theme?: 'white' };

const modifiers = {
  size: {
    targetClass: 'header',
    value: {
      s: 'header_size_s',
      m: 'header_size_m',
      l: 'header_size_l',
    },
  },
  theme: {
    targetClass: 'header__nav-item',
    value: {
      white: 'header__nav-item_theme_white',
    },
  },
};

export type TCreateStyle = (
  chosenModifiers: TSimpleStyleModifiers,
  states: { navIsVisible: boolean }
) => { styles: Record<string, string>; extraModifiers: TExtraModifiers };

const createSimpleStyle: TCreateStyle = (chosenModifiers, { navIsVisible }) => {
  let extraModifiers: TExtraModifiers;
  const extraStyles: Record<string, string> = {};

  switch (chosenModifiers.size) {
    case 's':
      extraModifiers = { logoSize: 's' };
      if (!navIsVisible) {
        extraStyles['header'] = cn(styles['header'], styles['header_is-rolled-up']);
      }
      break;
    case 'm':
      extraModifiers = { logoSize: 'm' };
      break;
    default:
      extraModifiers = { logoSize: 'l' };
      break;
  }

  return {
    styles: mergeStylesWithModifiers({ ...styles, ...extraStyles }, modifiers, chosenModifiers),
    extraModifiers,
  };
};

export default createSimpleStyle;
