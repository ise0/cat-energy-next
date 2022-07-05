import { mergeStylesWithModifiers } from 'shared/lib/modifiers';
import styles from './scss/pet-form-page.module.scss';
import Header from 'widgets/header';
import Footer from 'widgets/footer';
import Partnership from 'widgets/partnership';
import PetForm from '../sections/pet-form';

export type TBlockModifiers = {
  ['pet-form-page__header']: Parameters<typeof Header>[0]['modifiers'];
  ['pet-form-page__form']: Parameters<typeof PetForm>[0]['modifiers'];
  ['pet-form-page__partnership']: Parameters<typeof Partnership>[0]['modifiers'];
  ['pet-form-page__footer']: Parameters<typeof Footer>[0]['modifiers'];
};

type TSimpleStyleModifiers = { size: 's' | 'm' | 'l' };

type TCreateStyle = (states: { windowWidth: number }) => {
  styles: { [k: string]: string };
  blockModifiers: TBlockModifiers;
};

const modifiers = {
  size: {
    targetClass: 'pet-form-page',
    value: {
      s: 'pet-form-page_size_s',
      m: 'pet-form-page_size_m',
      l: 'pet-form-page_size_l',
    },
  },
};

const createSimpleStyle: TCreateStyle = ({ windowWidth }) => {
  let blockModifiers: TBlockModifiers;
  let selfModifiers: TSimpleStyleModifiers;
  if (windowWidth < 768) {
    selfModifiers = { size: 's' };
    blockModifiers = {
      'pet-form-page__header': { style: 'simple', size: 's' },
      'pet-form-page__form': { style: 'simple', size: 's' },
      'pet-form-page__footer': { style: 'simple', size: 's' },
      'pet-form-page__partnership': { style: 'simple', size: 's' },
    };
  } else if (windowWidth < 1280) {
    selfModifiers = { size: 'm' };
    blockModifiers = {
      'pet-form-page__header': { style: 'simple', size: 'm' },
      'pet-form-page__form': { style: 'simple', size: 'm' },
      'pet-form-page__footer': { style: 'simple', size: 'm' },
      'pet-form-page__partnership': { style: 'simple', size: 'm' },
    };
  } else {
    selfModifiers = { size: 'l' };
    blockModifiers = {
      'pet-form-page__header': { style: 'simple', size: 'l' },
      'pet-form-page__form': { style: 'simple', size: 'l' },
      'pet-form-page__footer': { style: 'simple', size: 'm' },
      'pet-form-page__partnership': { style: 'simple', size: 'l' },
    };
  }

  return {
    styles: mergeStylesWithModifiers(styles, modifiers, selfModifiers),
    blockModifiers,
  };
};

export default createSimpleStyle;
