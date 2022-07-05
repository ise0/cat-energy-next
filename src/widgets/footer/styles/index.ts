import { mergeStylesWithModifiers } from 'shared/lib/modifiers';
import styles from './scss/footer.module.scss';

export type TSimpleStyleModifiers = { style: 'simple'; size: 's' | 'm' };

const modifiers = {
  size: {
    targetClass: 'footer',
    value: {
      s: 'footer_size_s',
      m: 'footer_size_m',
    },
  },
};

const createSimpleStyle = (chosenModifiers: TSimpleStyleModifiers) =>
  mergeStylesWithModifiers(styles, modifiers, chosenModifiers);

export default createSimpleStyle;
