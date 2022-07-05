import { mergeStylesWithModifiers } from 'shared/lib/modifiers';
import styles from './scss/banner.module.scss';
import BtnLink from 'shared/ui/btn-link';

type TBlockModifiers = {
  ['banner__link']: Parameters<typeof BtnLink>[0]['modifiers'];
};

export type TSimpleStyleModifiers = { style: 'simple'; size: 's' | 'm' | 'l' };

type TCreateStyle = (chosenModifiers: TSimpleStyleModifiers) => {
  styles: { [k: string]: string };
  blockModifiers: TBlockModifiers;
};

const modifiers = {
  size: {
    targetClass: 'banner',
    value: {
      s: 'banner_size_s',
      m: 'banner_size_m',
      l: 'banner_size_l',
    },
  },
};

const createSimpleStyle: TCreateStyle = (chosenModifiers) => {
  let blockModifiers: TBlockModifiers;

  switch (chosenModifiers.size) {
    case 's':
      blockModifiers = {
        banner__link: { style: 'simple', size: 's', theme: 'green' },
      };
      break;
    case 'm':
      blockModifiers = {
        banner__link: { style: 'simple', size: 'm', theme: 'green' },
      };
      break;
    default:
      blockModifiers = {
        banner__link: { style: 'simple', size: 'm', theme: 'green' },
      };
      break;
  }

  return {
    styles: mergeStylesWithModifiers(styles, modifiers, chosenModifiers),
    blockModifiers,
  };
};

export default createSimpleStyle;
