import { mergeStylesWithModifiers } from 'shared/lib/modifiers';
import styles from './scss/extra-catalog.module.scss';
import BtnLink from 'shared/ui/btn-link';

type TBlockModifiers = {
  ['product__link']: Parameters<typeof BtnLink>[0]['modifiers'];
};

export type TSimpleStyleModifiers = { style: 'simple'; size: 's' | 'm' | 'l' };

type TCreateStyle = (chosenModifiers: TSimpleStyleModifiers) => {
  styles: { [k: string]: string };
  blockModifiers: TBlockModifiers;
};

const modifiers = {
  size: {
    targetClass: 'extra-catalog',
    value: {
      s: 'extra-catalog_size_s',
      m: 'extra-catalog_size_m',
      l: 'extra-catalog_size_l',
    },
  },
};

const createSimpleStyle: TCreateStyle = (chosenModifiers) => {
  const blockModifiers: TBlockModifiers = {
    product__link: { style: 'simple', size: 's', theme: 'green' },
  };

  return {
    styles: mergeStylesWithModifiers(styles, modifiers, chosenModifiers),
    blockModifiers: blockModifiers as TBlockModifiers,
  };
};

export default createSimpleStyle;
