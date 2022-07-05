import { mergeStylesWithModifiers } from 'shared/lib/modifiers';
import type { TBlockModifiers, TCreateStyle } from '..';
import styles from './scss/menu.module.scss';

export type TSimpleStyleModifiers = unknown;

const modifiers = {};

const createSimpleStyle: TCreateStyle = (chosenModifiers) => {
  const blockModifiers: TBlockModifiers = {
    'menu__item-ctrl': { style: 'text', size: 's' },
  };

  return {
    styles: mergeStylesWithModifiers(styles, modifiers, chosenModifiers),
    blockModifiers,
  };
};
export default createSimpleStyle;
