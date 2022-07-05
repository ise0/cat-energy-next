import { mergeStylesWithModifiers } from 'shared/lib/modifiers';
import styles from './scss/pet-form.module.scss';
import BtnLink from 'shared/ui/btn-link';
import CheckBtn from 'shared/ui/check-btn';
import TextArea from 'shared/ui/text-area';
import TextInput from 'shared/ui/text-input';

type TBlockModifiers = {
  TextInputGroup: Parameters<typeof TextInput>[0]['modifiers'];
  contactsMail: Parameters<typeof TextInput>[0]['modifiers'];
  contactsPhone: Parameters<typeof TextInput>[0]['modifiers'];
  ['goals__item']: Parameters<typeof CheckBtn>[0]['modifiers'];
  ['pet-form__extra-products-item']: Parameters<typeof CheckBtn>[0]['modifiers'];
  ['pet-form__comment']: Parameters<typeof TextArea>[0]['modifiers'];
  ['pet-form__submit-btn']: Parameters<typeof BtnLink>[0]['modifiers'];
};

export type TSimpleStyleModifiers = { style: 'simple'; size: 's' | 'm' | 'l' };

type TCreateStyle = (chosenModifiers: TSimpleStyleModifiers) => {
  styles: { [k: string]: string };
  blockModifiers: TBlockModifiers;
};

const modifiers = {
  size: {
    targetClass: 'pet-form',
    value: {
      s: 'pet-form_size_s',
      m: 'pet-form_size_m',
      l: 'pet-form_size_l',
    },
  },
};

const createSimpleStyle: TCreateStyle = (chosenModifiers) => {
  let blockModifiers: TBlockModifiers;

  switch (chosenModifiers.size) {
    case 's':
      blockModifiers = {
        TextInputGroup: { style: 'simple', size: 's' },
        contactsMail: { style: 'simple', size: 's', icon: 'mail' },
        contactsPhone: { style: 'simple', size: 's', icon: 'phone' },
        goals__item: { style: 'radio', size: 's' },
        'pet-form__comment': { style: 'simple', size: 's' },
        'pet-form__extra-products-item': { style: 'box', size: 's' },
        'pet-form__submit-btn': { style: 'simple', size: 's', theme: 'green' },
      };
      break;
    default:
      blockModifiers = {
        TextInputGroup: { style: 'simple', size: 'm' },
        contactsMail: { style: 'simple', size: 'm', icon: 'mail' },
        contactsPhone: { style: 'simple', size: 'm', icon: 'phone' },
        goals__item: { style: 'radio', size: 'm' },
        'pet-form__comment': { style: 'simple', size: 'm' },
        'pet-form__extra-products-item': { style: 'box', size: 'm' },
        'pet-form__submit-btn': { style: 'simple', size: 'm', theme: 'green' },
      };
      break;
  }

  return {
    styles: mergeStylesWithModifiers(styles, modifiers, chosenModifiers),
    blockModifiers,
  };
};

export default createSimpleStyle;
