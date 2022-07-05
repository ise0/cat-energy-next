import { mergeStylesWithModifiers } from 'shared/lib/modifiers';
import BtnLink from 'shared/ui/btn-link';
import styles from './scss/product-card.module.scss';

type TBlockModifiers = {
  ['product-card__link']: Parameters<typeof BtnLink>[0]['modifiers'];
};

export type TSimpleStyleModifiers = { style: 'simple'; size: 's' | 'm' | 'l' };

type TCreateStyle = (chosenModifiers: TSimpleStyleModifiers) => {
  styles: { [k: string]: string };
  blockModifiers: TBlockModifiers;
};

const modifiers = {
  size: {
    targetClass: 'product-card',
    value: {
      s: 'product-card_size_s',
      m: 'product-card_size_m',
      l: 'product-card_size_l',
    },
  },
};

const createSimpleStyle: TCreateStyle = (chosenModifiers) => {
  const blockModifiers: TBlockModifiers = {
    ['product-card__link']: { style: 'simple', size: 's', theme: 'green' },
  };

  return {
    styles: mergeStylesWithModifiers(styles, modifiers, chosenModifiers),
    blockModifiers,
  };
};

export default createSimpleStyle;
