import { mergeStylesWithModifiers } from 'shared/lib/modifiers';
import type { TCreateStyle } from '..';
import styles from './scss/text-input.module.scss';

export type TSimpleStyleModifiers = { size: 's' | 'm'; icon?: 'mail' | 'phone'; required?: boolean };

const modifiers = {
  size: {
    targetClass: 'text-input',
    value: {
      s: 'text-input_size_s',
      m: 'text-input_size_m',
    },
  },
  icon: {
    targetClass: 'text-input',
    value: {
      mail: 'text-input_icon_mail',
      phone: 'text-input_icon_phone',
    },
  },
  required: {
    targetClass: 'text-input',
    value: 'text-input_required',
  },
};

const createSimpleStyle: TCreateStyle = (chosenModifiers) =>
  mergeStylesWithModifiers(styles, modifiers, chosenModifiers);

export default createSimpleStyle;
