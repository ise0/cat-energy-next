import { mergeStylesWithModifiers } from 'shared/lib/modifiers';
import styles from './scss/p-header.module.scss';
import BtnLink from 'shared/ui/btn-link';

export type TBlockModifiers = {
  'p-header__filter-btn': Parameters<typeof BtnLink>[0]['modifiers'];
  'p-header__sort-btn': Parameters<typeof BtnLink>[0]['modifiers'];
};

export type TSimpleStyleModifiers = { style: 'simple' };

type TCreateStyle = (chosenModifiers: TSimpleStyleModifiers) => {
  styles: { [k: string]: string };
  blockModifiers: TBlockModifiers;
};

const createSimpleStyle: TCreateStyle = (chosenModifiers) => {
  const blockModifiers: TBlockModifiers = {
    'p-header__filter-btn': { style: 'simple', theme: 'gray', size: 's', shape: 'oval' },
    'p-header__sort-btn': { style: 'simple', theme: 'gray', size: 's', shape: 'oval' },
  };

  return {
    styles: mergeStylesWithModifiers(styles, {}, chosenModifiers),
    blockModifiers,
  };
};

export default createSimpleStyle;
