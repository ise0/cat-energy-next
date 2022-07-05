import { mergeStylesWithModifiers } from 'shared/lib/modifiers';
import styles from './scss/catalog.module.scss';
import ProductCard from 'shared/ui/product-card';
import BtnLink from 'shared/ui/btn-link';
import Spin from 'shared/ui/spin';

type TBlockModifiers = {
  ['product__card']: Parameters<typeof ProductCard>[0]['modifiers'];
  ['catalog__spin-inner']: Parameters<typeof Spin>[0]['modifiers'];
  ['catalog__pages-prev']: Parameters<typeof BtnLink>[0]['modifiers'];
  ['catalog__pages-next']: Parameters<typeof BtnLink>[0]['modifiers'];
};

export type TSimpleStyleModifiers = { style: 'simple'; size: 's' | 'm' | 'l' };

type TCreateStyle = (chosenModifiers: TSimpleStyleModifiers) => {
  styles: { [k: string]: string };
  blockModifiers: TBlockModifiers;
};

const modifiers = {
  size: {
    targetClass: 'catalog',
    value: {
      s: 'catalog_size_s',
      m: 'catalog_size_m',
      l: 'catalog_size_l',
    },
  },
};

const createSimpleStyle: TCreateStyle = (chosenModifiers) => {
  const blockModifiers: Partial<TBlockModifiers> = {
    'catalog__spin-inner': { style: 'simple' },
    'catalog__pages-prev': { style: 'text', size: 's' },
    'catalog__pages-next': { style: 'text', size: 's' },
  };

  switch (chosenModifiers.size) {
    case 's':
      blockModifiers['product__card'] = { style: 'simple', size: 's' };
      break;
    case 'm':
      blockModifiers['product__card'] = { style: 'simple', size: 'm' };
      break;
    default:
      blockModifiers['product__card'] = { style: 'simple', size: 'l' };
      break;
  }

  return {
    styles: mergeStylesWithModifiers(styles, modifiers, chosenModifiers),
    blockModifiers: blockModifiers as TBlockModifiers,
  };
};

export default createSimpleStyle;
