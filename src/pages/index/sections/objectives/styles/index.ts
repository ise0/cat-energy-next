import { mergeStylesWithModifiers } from 'shared/lib/modifiers';
import styles from './scss/objectives.module.scss';
import BtnLink from 'shared/ui/btn-link';

type TBlockModifiers = {
  ['objectives__link']: Parameters<typeof BtnLink>[0]['modifiers'];
};

export type TSimpleStyleModifiers = { style: 'simple'; size: 's' | 'm' | 'l' };

type TCreateStyle = (chosenModifiers: TSimpleStyleModifiers) => {
  styles: { [k: string]: string };
  blockModifiers: TBlockModifiers;
};

const modifiers = {
  size: {
    targetClass: 'objectives',
    value: {
      s: 'objectives_size_s',
      m: 'objectives_size_m',
      l: 'objectives_size_l',
    },
  },
};

const createSimpleStyle: TCreateStyle = (chosenModifiers) => {
  let blockModifiers: TBlockModifiers;

  switch (chosenModifiers.size) {
    case 's':
      blockModifiers = {
        objectives__link: {
          style: 'text',
          size: 's',
          icon: 'arrow',
        },
      };
      break;
    default:
      blockModifiers = {
        objectives__link: {
          style: 'text',
          size: 'm',
          icon: 'arrow',
        },
      };
      break;
  }

  return {
    styles: mergeStylesWithModifiers(styles, modifiers, chosenModifiers),
    blockModifiers,
  };
};

export default createSimpleStyle;
